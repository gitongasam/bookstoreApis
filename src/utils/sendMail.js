const {createTransport} = require("nodemailer");
require ("dotenv").config()
 const email_config = require ('../config/emailconfig')

const message_Option ={
    to : "njengachris42@gmail.com",
    from: process.env.EMAIL_USER,
    subject: "Email testing || Send from Nodemailer",
    text: "You have succesfully registerd in to your account!!!!"

}
const transporter =createTransport(email_config);

async function sendMail(){
    try{
        let results = await transporter.sendMail(message_Option)
        console.log(results);

    }
catch(error){
    console.log(error);
}

}
module.exports ={
    sendMail

}