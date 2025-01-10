import { Request, Response } from 'express';
import { isValidEmail, isValidPassword, validateNumbers, validateStrings } from '../utils/validators';
import jwtTokenGenerator from '../utils/jwt.generator';
import { db } from '../db';
import * as bcrypt from 'bcryptjs';
import responder from '../utils/responder';
import { User } from '../types/user';


export const postLoginAdmin = async (req: Request, res: Response) => {
    const email: string = req.body.email!;
    const password: string = req.body.password!;

    if (!isValidEmail(email)) {
        responder(res, 400, 'error', 'Invalid email.');
        return; 
    }

    if (!isValidPassword(password)) {
        responder(res, 400, 'error', 'Invalid password.');
    }

    // Get admin from db
    try {
        const userObject: null | User = await db.oneOrNone('SELECT * FROM Account WHERE email = ${email}', {
            email: email
        });

        // Check if user exists
        if (!userObject) {
            responder(res, 401, 'error', 'No admin with that email address');
            return;
        }

        // Check if password is correct
        const passwordMatch: boolean = await bcrypt.compare(password, userObject.password)

        if (!passwordMatch) {
            responder(res, 401, 'error', 'Invalid user credentials')
            return; 
        }

        // Successful Login
        const token: string = jwtTokenGenerator('24h', 'email', userObject.email, 'purpose', 'authentication');
        responder(res, 200, 'message', 'Successfull login!', 'token', token, 'role', userObject.user_type, 'id', userObject.account_id)
        return;
    } catch(err) {
        responder(res, 500, 'error', 'Internal Server Error')
        return;
    }  
};

export const getAdminProfile = async (req:Request & { user?: User }, res:Response): Promise<void> => {
    const account_id: string = req.params.id!;

    if (isNaN(Number(account_id))) {
        responder(res, 400, 'error', 'Profile ID must be a number');
        return;
    }

    if (validateNumbers([Number(account_id)]) === false) {
        responder(res, 400, 'error', 'Invalid input values');
        return;
    }

    try {
        const profile = await db.oneOrNone('SELECT * FROM Account WHERE account_id = ${account_id}', {
            account_id: account_id
        });

        if (!profile) {
            responder(res, 404, 'error', 'Profile not found');
            return;
        }

        if (profile.account_id !== req.user?.account_id) {
            responder(res, 401, 'error', 'Unauthorized');
            return;
        }

        responder(res, 200, 'profile', profile);
        return;
    } catch(err) {
        responder(res, 500, 'error', 'Internal Server Error');
        return;
    }
};

export const getJuniorView = async (req:Request & { user?: User }, res:Response) => {
    try {
        const view = await db.manyOrNone('SELECT * FROM junior');

        if (!view) {
            responder(res, 404, 'error', 'View does not exist')
            return;
        }

        responder(res, 200, 'data', view)
        return;
    } catch(err) {
        responder(res, 500, 'error', 'Internal Server Error');
        return;
    }
}

export const getMediorView = async (req:Request & { user?: User }, res:Response) => {
    try {
        const view = await db.manyOrNone('SELECT * FROM medior');

        if (!view) {
            responder(res, 404, 'error', 'View does not exist')
            return;
        }

        responder(res, 200, 'data', view)
        return;
    } catch(err) {
        responder(res, 500, 'error', 'Internal Server Error');
        return;
    }
}

export const getSeniorView = async (req:Request & { user?: User }, res:Response) => {
    try {
        const view = await db.manyOrNone('SELECT * FROM senior');

        if (!view) {
            responder(res, 404, 'error', 'View does not exist')
            return;
        }

        responder(res, 200, 'data', view)
        return;
    } catch(err) {
        responder(res, 500, 'error', 'Internal Server Error');
        return;
    }
}

export const getStatistics = async (req: Request & { user?: User }, res: Response) => {
    try {
        const statistics = await db.manyOrNone('SELECT * FROM country_statistics')

        if (!statistics) {
            responder(res, 404, 'error', 'No statistics found')
            return;
        }

        responder(res, 200, 'data', statistics);
        return;
    } catch(err) {
        responder(res, 500, 'error', 'Internal Server Error');
        return;
    }
}

export const getStatisticsByCountry = async (req: Request & { user?: User }, res: Response) => {
    const country: string = req.params.country!;

    if (validateStrings([String(country)]) === false) {
        responder(res, 400, 'error', 'Invalid input values');
        return;
    }

    try {
        const statistics = await db.oneOrNone('SELECT * FROM country_statistics WHERE country_name = ${country}', {
            country: country
        });

        if (!statistics) {
            responder(res, 404, 'error', 'No statistics found')
            return;
        }

        responder(res, 200, 'data', statistics);
        return;
    } catch(err) {
        responder(res, 500, 'error', 'Internal Server Error');
        return;
    }
}

export const getTopRevenueCountries = async (req: Request & { user?: User }, res: Response) => {
    try {
        const statistics = await db.manyOrNone('SELECT * FROM top_revenue_countries()');

        if (!statistics) {
            responder(res, 404, 'error', 'No statistics found')
            return;
        }

        responder(res, 200, 'data', statistics);
        return;
    } catch(err) {
        responder(res, 500, 'error', 'Internal Server Error');
        return;
    }
}