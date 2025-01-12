import { Response } from 'express';
import xml2js from 'xml2js';

function responder(res: Response, status: number, ...args: any[]): void {

    const data: { [key: string]: string } = {};

    for (let i = 0; i < args.length; i += 2) {
        const key = args[i];
        const value = args[i + 1];
        data[key] = value;
    }

    // Check if the client accepts JSON
    if (res.req?.accepts('application/json')) {
        res.setHeader('Accept', 'application/json');
        res.status(status).json(data);
        return;
    }


    // Check if the client accepts XML
    if (res.req?.accepts('application/xml')) {
        res.setHeader('Accept', 'application/xml');
        res.status(status).send(jsonToXml(data));
        return;
    }

    // Default to 'application/json'
    res.setHeader('Accept', 'application/json');
    res.status(status).json(data);
    return;
}

function jsonToXml(json : any) {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(json);
    return xml;
}

export default responder;
