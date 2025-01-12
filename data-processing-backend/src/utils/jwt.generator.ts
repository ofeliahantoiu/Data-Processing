/*
    CREATES a JWT function which accepts a time argument and any number of subsequent string argument(should be even excluding time)
    JWT token gets created with time as its expiery date
    The arguments after time will be stored as a hashmap and encoded into the JWT token
    for this reason its important to have an even number of arguments(excluding time) since every odd argument will be the key
    and every even argument will be that keys value pair.

    example usage 

    import jwtTokenGenerator from 'path'

    const token = jwtTokenGenerator('1h', 'email', 'example@gmail.com', 'password', 'examplepassword')

    and these values can be accessed by 

    const decode = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

    const data = decode.data;

    console.log(data['email']) -> Prints out email

*/
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

function jwtTokenGenerator(time : string , ...args : string[]): string {

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    if(args.length % 2 !== 0){
        throw new Error("Make sure each key has a value!");
    }

    const data : {[key : string]: string } = {}

    for (let i = 0; i < args.length; i += 2) {
        const key = args[i];
        const value = args[i + 1];
        data[key] = value;
    }

    const token: string = jwt.sign({data}, process.env.JWT_SECRET, { expiresIn: time });
    return token;
}

export default jwtTokenGenerator;