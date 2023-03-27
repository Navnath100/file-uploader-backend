import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(process.env.CLIENT_ID);
export async function ApiAuthorization(req: Request, res: Response, next: any) {
    try {
        const auth = req.headers.authorization
        if (auth) {
            client.verifyIdToken({
                idToken: auth,
                audience: process.env.CLIENT_ID,
            }).then((result: any) => {
                return next()
            }).catch((error: any) => res.status(403));
        } else {
            return next(new Error("API Authorization Credentials Required...!"));
        }
    }
    catch (error) {
        console.log("error : ", error);

        next(error);
    }
}