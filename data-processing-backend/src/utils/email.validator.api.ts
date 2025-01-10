import axios, { AxiosResponse, AxiosError } from 'axios';

// Validate email using API

async function validateEmail(email: string): Promise<AxiosResponse> {
    try {
        const response: AxiosResponse = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.EMAIL_API_KEY}&email=${email}`);
        return response;
    } catch (err: any) {
        return err;
    }
}

export default validateEmail;