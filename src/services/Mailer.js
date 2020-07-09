import nodemailer from "nodemailer";
import { content, subject } from "../config/mailer";
import { MailAuthConfig, ServerConfig } from "../constants/secret";

class Mailer {
    constructor() {
        this.subject = subject;
        this.auth = MailAuthConfig;
    }

    getTransportOptions() {
        return {
            service: "gmail",
            auth: this.auth,
        };
    }

    getSendMailOptions(toEmail, verifyToken) {
        return {
            from: this.auth.user,
            to: toEmail,
            subject: this.subject,
            html: content(`${ServerConfig.HOST}/api/v1/users/mail/verify?token=${verifyToken}`),
          };
    }

    createTransport(options) {
        return nodemailer.createTransport(options);
    }

    sendMail(transporter, sendMailOptions) {
        return transporter.sendMail(sendMailOptions);
    }
}

export default new Mailer();
