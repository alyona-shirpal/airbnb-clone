import * as Email from 'email-templates';
import * as nodemailer from 'nodemailer';

import { config } from '../config';
import * as path from 'path';
import { ErrorHandler } from '../errors';
import { ResponseStatusCodesEnum, ActionEnum } from '../constants';
import { htmlTemplates } from '../email-templates';

const transporter = nodemailer.createTransport({
    service: config.ROOT_EMAIL_SERVICE,
    auth: {
        user: config.ROOT_EMAIL,
        pass: config.ROOT_EMAIL_PASSWORD
    }
});
console.log(config.ROOT_EMAIL_SERVICE, config.ROOT_EMAIL, config.ROOT_EMAIL_PASSWORD);
if (
    !config.ROOT_EMAIL_SERVICE ||
    !config.ROOT_EMAIL ||
    !config.ROOT_EMAIL_PASSWORD
) {
    throw Error('Root email credentials are not defined!');
}
console.log(config.ROOT_EMAIL_SERVICE, config.ROOT_EMAIL, config.ROOT_EMAIL_PASSWORD);
// @ts-ignore
const emailTemplates = new Email({
    message: {},
    views: {
        root: path.resolve(__dirname, '../', 'email-templates')
    }
});

export class MailService {
    async sendEmail (email: string, action: ActionEnum, context: object): Promise<void> {
        const templateInfo = htmlTemplates[action];

        if (!templateInfo) {
            throw new ErrorHandler(ResponseStatusCodesEnum.SERVER_ERROR, 'Template not found');
        }

        const html = await emailTemplates.render(templateInfo.templateFileName, context);

        await transporter.sendMail({
            from: `NOREPLY <${config.ROOT_EMAIL}>`,
            to: email,
            subject: templateInfo.subject,
            html
        });
    }
}

export const emailService = new MailService();
