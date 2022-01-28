import { ActionEnum } from '../constants';

export const htmlTemplates: {[index: string]: {subject: string, templateFileName: string}} = {
    [ActionEnum.USER_REGISTER]: {
        subject: 'Welcome',
        templateFileName: 'welcome'
    },
    [ActionEnum.CONFIRM_BOOKING]: {
        subject: 'Booking confirmation',
        templateFileName: 'confirmation'
    }
};
