// import coolsms from 'coolsms-node-sdk';
// const mysms = coolsms.default;

export class PhoneService {
  checkPhone = (phone: string): boolean => {
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  // 인증번호 로직
  // getToken = () => {
  //   const result = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  //   console.log(result);
  //   return result;
  // };

  // sendTokenToSMS = async (myPhone, result) => {
  //   const messageService = new mysms(process.env.SMS_KEY, process.env.SMS_SECRET);
  //   const res = await messageService.sendOne({
  //     to: myPhone,
  //     from: process.env.SMS_SENDER,
  //     text: `[수헌컴퍼니] 인증번호는 ${result} 입니다`
  //   });
  //   console.log(res);
  // };
}
