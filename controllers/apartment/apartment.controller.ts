import { NextFunction, Request, Response } from 'express';
import { Apartment, Files } from '../../db/models';
import { ErrorHandler, errors } from '../../errors';
import { ResponseStatusCodesEnum } from '../../constants';

const postApartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id } = req.user;
        const apartment = req.body;
        apartment.user_id = user_id;

        await Apartment.create(apartment);

        res.status(ResponseStatusCodesEnum.CREATED).end();
    } catch (e) {
        next(e);
    }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allApartments = await Apartment.findAll(req.body);

        res.json(allApartments);
    } catch (e) {
        next();
    }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { apartment_id } = req.params;
        const apartment = await Apartment.findByPk(apartment_id);
        res.json(apartment);
    } catch (e) {
        next(e);
    }
};

const deleteApartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { apartment_id } = req.params;

        if (!apartment_id) {
            throw new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, errors.NOT_FOUND_USER_NOT_PRESENT.message);
        }

        await Apartment.destroy({ where: { apartment_id } });

        res.status(ResponseStatusCodesEnum.DELETED).end();
    } catch (e) {
        next(e);
    }
};

const updateApartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { apartment_id } = req.params;

        if (!apartment_id) {
            throw new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, errors.NOT_FOUND_USER_NOT_PRESENT.message);
        }

        await Apartment.update({ ...req.body }, { where: { apartment_id } });
        res.status(ResponseStatusCodesEnum.UPDATED).end();
    } catch (e) {
        next(e);
    }
};

const uploadImages = async (req: Request, res:Response, next :NextFunction) => {
    const files: any = req.files;

    const apartmentInfo = await Apartment.findOne({ where: { apartment_id: req.params.apartment_id } });

    if(!apartmentInfo) {
        return res.status(404);
    }

    let file: string = '';
    for(let i = 0; i < files.length; i++ ) {
        file = files[i].filename;
    }

    const newFile:any = {};
    newFile.apartment_id = apartmentInfo.apartment_id;
    newFile.user_id = apartmentInfo.user_id;
    newFile.filename = file;

    await Files.create(newFile);

    // @ts-ignore
    res.status(200).json(files.map(file => file.filename)).end();
};

export { postApartment, getAll, getOne, deleteApartment, updateApartment, uploadImages };
