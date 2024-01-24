import { NextFunction, Request, Response } from "express";

class RequestDateMiddleware{
    execute(req: Request, res: Response, next: NextFunction){
        const now = new Date();
        console.log("Data da requisição: " + now.toLocaleDateString("pt-br") + " " + now.toLocaleTimeString("pt-br"));
        
        next();
    }
}

const requestDateMiddleware = new RequestDateMiddleware();

export {requestDateMiddleware}