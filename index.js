const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USERNAME1,
    pass: process.env.PASSWORD,
  },
});

app.post("/details", (req, res) => {
  try {
    const { name, companyemail, request, phonenumber } = req.body;


    const mailOptions = {
      from: process.env.USERNAME1, 
      to: process.env.TOEMAIL, 
      subject: 'New Details Submitted', 
      text: `
        New details submitted:
        Name: ${name}
        Company Email: ${companyemail}
        Request: ${request}
        Phone Number: ${phonenumber}
      `, 
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log("Server running");
});
