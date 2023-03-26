import express, { Express, Request, Response } from 'express';
import File from '../model/file'
import Joi from 'joi';

async function getFiles(req: Request, res: Response) {
    console.log(req.query.email);
    const { email } = req.query
    const files = await File.find({ email })
    res.send(files)
}

async function addFileDetails(req: Request, res: Response) {
    try {
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            key: Joi.string().required(),
            type: Joi.string().required(),
            fileName: Joi.string().required(),
        });
        const value = await schema.validateAsync(req.body).catch((e: any) => { res.status(400).send(e) });
        const file = await new File(value).save();
        res.send(value);
    } catch (error: any) {
        throw new Error("Internal server error : " + error)
    }
}

export { addFileDetails, getFiles }