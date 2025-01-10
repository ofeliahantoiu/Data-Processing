import { Request, Response } from 'express';
import { isValidEmail, isValidPassword, validateStrings } from '../utils/validators';
import jwtTokenGenerator from '../utils/jwt.generator'
import sendMail from '../utils/email.sender';
import { db } from '../db';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import responder from '../utils/responder';
import { User } from '../types/user';

export const postLoginUser = async (req: Request, res: Response): Promise<void> => {

    const email: string = req.body.email!;
    const password: string = req.body.password!;

    // Validate email
    if (!isValidEmail(email)) {
        responder(res, 400, 'error', 'Invalid email address. Please make sure that the input values are valid.');
        return;
    }

    //Validate password
    if (!isValidPassword(password)) {
        responder(res, 400, 'error', 'Invalid password. Please make sure that the input values are valid.');
        return;
    }

    //Fetch user object from DB
    try {
        const userObject: null | User = await db.oneOrNone('SELECT * FROM Account WHERE email = ${email}', {
            email: email
        });

        //Check if user exists
        if (!userObject) {
            responder(res, 401, 'error', 'There is no user account associated with this email address');
            return;
        }

        //Check if user account is verified or not
        if (!userObject.verified) {
            responder(res, 401, 'error', 'User account has not been verified yet')
            return;
        }

        //Check if user is not blocked
        if (userObject.blocked) {
            responder(res, 401, 'error', 'User account is currently blocked, please reset password');
            return;
        }

        //Check if password is correct
        const passwordMatch: boolean = await bcrypt.compare(password, userObject.password)

        //check if the passwordMatch if false
        if (!passwordMatch) {
            //if number of attempts is 2 then increase number of attempts and block user
            if (userObject.log_in_attempt_count === 2) {
                try {
                    await db.none('UPDATE Account SET log_in_attempt_count = $<log_in_attempt_count>, blocked = $<blocked> WHERE email = $<email>', {
                        log_in_attempt_count: (userObject.log_in_attempt_count + 1),
                        blocked: true,
                        email: userObject.email
                    })
                    responder(res, 401, 'error', 'Too many login attempts, please reset password');
                    return;
                } catch (err) {
                    responder(res, 500, 'error', 'Internal Server Error');
                    return;
                }
            }

            //if number of attempts is less than 2, then increase number of attempts and throw error message
            try {
                await db.none('UPDATE Account SET log_in_attempt_count = $<log_in_attempt_count> WHERE email = $<email>', {
                    log_in_attempt_count: (userObject.log_in_attempt_count + 1),
                    email: userObject.email
                })
                responder(res, 401, 'error', 'Invalid user credentials')
                return;
            } catch (err) {
                responder(res, 500, 'error', 'Internal Server Error');
                return;
            }
        }

        //Successfull login, generate a jwt token for further authentication
        const token: string = jwtTokenGenerator('24h', 'email', userObject.email, 'purpose', 'authentication');
        responder(res, 200, 'message', 'Successfull login!', 'token', token)
        return;
    } catch (err) {
        responder(res, 500, 'error', 'Internal Server Error')
        return;
    }
};

export const postPasswordResetLink = async (req: Request, res: Response): Promise<void> => {

    const email: string = req.body.email!;

    //Validate email
    if (!isValidEmail(email)) {
        responder(res, 400, 'error', 'Invalid email address. Please make sure that the input values are valid.');
        return;
    }

    //check if user has been registered with email
    try {
        const userObject: null | User = await db.oneOrNone('SELECT * FROM Account WHERE email = ${email}', {
            email: email
        });

        if (!userObject) {
            responder(res, 401, 'error', 'User is not registered')
            return;
        }

        //generate token  and send email to user
        try {
            const token = jwtTokenGenerator('30m', 'email', email, 'purpose', 'password-reset');
            const info = await sendMail(email, 'Password Reset', 'login/password-reset/', token, 'Click this to reset password!')
            responder(res, 200, 'message', 'Password Resest link has been sent successfully')
            return;
            //Password reset link should redirect to a page where user can enter new password, but thats not possible without frontend therefore it doesnt redirect to any page
        } catch (err) {
            responder(res, 500, 'error', 'Error sending mail')
            return;
        }
    } catch (err) {
        responder(res, 500, 'error', 'Internal server error')
        return;
    }
};

export const patchPasswordResetSubmit = async (req: Request, res: Response): Promise<void> => {
    const token: string = req.params.token!
    const password: string = req.body.password!

    if (!isValidPassword(password)) {
        responder(res, 400, 'error', 'Invalid password. Please make sure that the input values are valid.');
        return;
    }

    if (validateStrings([token]) === false) {
        responder(res, 400, 'error', 'Invalid input values');
        return;
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        const userData = decodedToken.data;
        const email = userData['email'];

        if (userData['purpose'] !== 'password-reset') {
            responder(res, 401, 'error', 'Incorrect JWT token');
            return;
        }

        try {
            const hashedPassword: string = await bcrypt.hash(password, 10);
            await db.none("UPDATE Account SET password = $<password>, blocked = $<blocked>, log_in_attempt_count = $<log_in_attempt_count>  WHERE email = $<email>", {
                password: hashedPassword,
                blocked: false,
                log_in_attempt_count: 0,
                email: email
            })

            responder(res, 200, 'message', 'Password updated sucessfully')
            return;
        } catch (err) {
            responder(res, 500, 'error', 'Internal server error')
            return;
        }

    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            responder(res, 401, 'error', 'Expired Link');
        } else {
            responder(res, 400, 'error', 'JWT malformed')
            return;
        }
    }
}

export const getPasswordResetVerification = async (req: Request, res: Response): Promise<void> => {

    const token: string = req.params.token!

    if (validateStrings([token]) === false) {
        responder(res, 400, 'error', 'Invalid input values');
        return;
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        const userData = decodedToken.data;
        const email = userData['email'];

        if (userData['purpose'] !== 'password-reset') {
            responder(res, 401, 'error', 'Incorrect JWT token');
            return;
        }

        try {
            const userObject: null | User = await db.oneOrNone('SELECT * FROM Account WHERE email = ${email}', {
                email: email
            });

            if (!userObject) {
                responder(res, 401, 'error', 'User is not registered')
                return;
            }

            responder(res, 200, 'message', 'User is verified to reset password')
            return;
        } catch (err) {
            responder(res, 500, 'error', 'Internal server error')
            return;
        }

    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            responder(res, 401, 'error', 'Expired Link');
        } else {
            responder(res, 400, 'error', 'JWT malformed')
            return;
        }
    }

}