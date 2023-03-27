import express, { Express, Request, Response } from 'express';
import File from '../model/file'
import Joi from 'joi';

function parseJwt(token: string) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
}

async function getFiles(req: Request, res: Response) {
    const authorization: any = req.headers.authorization
    const decoded: any = parseJwt(authorization);
    const files = await File.find({ email: decoded.email })
    res.send(files)
}

async function addFileDetails(req: Request, res: Response) {
    try {
        const schema = Joi.object({
            key: Joi.string().required(),
            type: Joi.string().required(),
            fileName: Joi.string().required(),
        });
        const authorization: any = req.headers.authorization
        const decoded: any = parseJwt(authorization);
        const value = await schema.validateAsync(req.body).catch((e: any) => { res.status(400).send(e) });
        const file = await new File({ ...value, email: decoded.email }).save();
        res.send(file);
    } catch (error: any) {
        throw new Error("Internal server error : " + error)
    }
}

export { addFileDetails, getFiles }