/** This is a helper file for  sending the sms to clients */
import client from "twilio";

export const sendSmsUtil = async (phone, message) => {

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioClient = client(accountSid, authToken);

//   client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+15017122661',
//      to: '+15558675310'
//    })
//   .then(message => console.log(message.sid));

  let newSMs = await  twilioClient.messages.create({
      body:message,
      from:process.env.TWILIO_PHONE,
      to:phone
  })
  const {sid } = newSMs

  return sid

};
