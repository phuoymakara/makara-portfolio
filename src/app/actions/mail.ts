'use server';

//import { Resend } from 'resend';
//import { date } from 'zod';

//const resend = new Resend('re_16Gghxz6_HSXUCtTxWqMsgDyneH3eMBCs');
interface IEmail{
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function SendEmail (date: IEmail) {
  console.debug('DATA SUBMITTED FROM => ',date)
  // const res = await resend.emails.send({
  //   from: 'Mark <makara@53cloud.net>',
  //   to: ['makara@53cloud.net'],
  //   subject: 'Hello world',
  //   react: `<h1>Successfully</h1>`,
  // });
  // console.log("SEND",res)
  //if(error) return new Error('Fail email');
};