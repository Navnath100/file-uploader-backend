import { Request, Response } from "express";

export default function handleErrors(error: any, req: Request, res: Response, next: any) {
    try {
        if (res.statusCode == 200) res.status(500);
        res.send({ error: error.message });
    } catch (error) {
        next();
    }
}