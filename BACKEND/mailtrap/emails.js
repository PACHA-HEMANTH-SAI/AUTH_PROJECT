import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailtemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [
        {email}
    ]

    try {
        const res = await mailtrapClient.send({
            from : sender,
            to: recipient,
            subject : "Verify your email",
            html :  VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category : "Email Verification",
        })
        console.log("Email sent successfully");
    }
    catch(error) {
        console.log(error.message);
        throw new Error("error sending the verification email");
    }
}

export const sendWelcomeEmail = async (email,name) => {
    const recipient = [{email}]

    try {
        await mailtrapClient.send({
            from : sender,
            to: recipient,
            subject : "Welcome From Auth Company",
            html :  `
            <h3>Welcome ${name}</h3>
            <p>You are successfully verified your email
            </p>
            `,
            category : "Welcome Email",
        })

        console.log("Welcome email sent successfully");
    }catch(err) {
        console.log(err.message);
        throw new Error("error sending the welcome email");
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from : sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category: "Password Reset",
        })
    }catch(error) {
        console.log("Error Sending password reset email",error);

        throw new Error(`Error Sending reset password email ${error}`);
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })

        console.log("Reset password success email send successfully");
    }catch(error) {
        console.log("error in sending the reset password success email",error.message);

        res.send({success: false, message : error.message})
    }
}