import { ActionEnum } from '../constants';

export const htmlTemplates: {[index: string]: {subject: string, templateFileName: string}} = {
    [ActionEnum.USER_REGISTER]: {
        subject: 'welcome',
        templateFileName: 'welcome'
    },
    [ActionEnum.FORGOT_PASSWORD]: {
        subject: 'ohh so sorry',
        templateFileName: 'forgot-password'
    }
};
