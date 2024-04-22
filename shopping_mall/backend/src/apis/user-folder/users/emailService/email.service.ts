import * as nodemailer from 'nodemailer';
import { getToday } from 'src/commons/libraries/utils';

export class EmailService {
  checkEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  getWelcomeTemplate = (name: string, phone: string) => {
    const myTemplate = `
    <html>
      <body>
        <div style="display: flex; flex-direction: column; align-items:center;">
          <div style="width:500px;">
            <h1>${name}님 가입을 환영합니다!</h1>
            <hr/>
            <div>이름: ${name}</div>
            <div>전화번호: ${phone}</div>
            <div>가입일: ${getToday()}</div>
          </div>
        </div>
      </body>
    </html>
    `;

    return myTemplate;
  };

  sendTemplateToEmail = async (email: string, result: string) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.Email_ID,
        pass: process.env.Email_PASS, // 앱 비밀번호
      },
    });
    const res = await transporter.sendMail({
      from: process.env.Email_ID,
      to: email,
      subject: '[수헌컴퍼니] 가입을 축하합니다.',
      html: result,
    });
    console.log(res);
  };
}
