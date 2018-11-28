require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = {
   sms: (req,res)=>{ 
    //    console.log(req.body)
       const {name,phone} = req.body;
       client.messages.create({
      to: `1${phone}`,
      from: '+15204628545',
      body: `Hey there ${name}, thanks for contacting tccomic.com, if we haven't responded in 5 minutes, wait longer. \n Chow for now!`
   })
  .then(message => console.log(message.sid))
  .done();
}
}
