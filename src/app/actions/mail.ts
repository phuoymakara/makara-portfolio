'use server';
interface IEmail{
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function SendEmail (date: IEmail) {
  console.debug('DATA SUBMITTED FROM => ',date)
};