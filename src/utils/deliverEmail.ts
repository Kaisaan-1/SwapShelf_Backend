import nodemailer from "nodemailer";

interface mailOptionsProps {
    to: string;
    html: string;
    from: string;
    subject: string;
}

let transporter = nodemailer.createTransport({
    // host: "smtp.office365.com",
    service: 'gmail',
    secure: false,
    logger: true,
    debug: true,
    auth: {
        user: process.env["AUTH_EMAIL"],
        pass: process.env["AUTH_PSWD"]
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Ready for messages')
        console.log(success);
    }
});

const sendEmail = async (mailOptions: mailOptionsProps) =>{
    try {
        await transporter.sendMail(mailOptions);
        return;
    } catch (error) {
        throw error;
    }
}

export default sendEmail;