import { Response, Request, NextFunction } from 'express';

import { Transaction } from '../../db/models';

const allTransactions = async (req: Request, res:Response, next:NextFunction) => {
    try{
        const transactions = await Transaction.findAll();

        res.json(transactions);

    } catch(e) {
        next(e);
    }
}

export { allTransactions };