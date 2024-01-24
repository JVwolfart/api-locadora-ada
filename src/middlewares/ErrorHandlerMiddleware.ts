import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

class ErrorHandlerMiddleware {
    execute(error: Error | AppError, req: Request, res: Response, next: NextFunction){
        if(error){
            if (error instanceof AppError){
                res.status(error.status).send({mensagem: error.mensagem})
            } else {
                console.error(error);
                return res.status(500).send({mensagem: "Ocorreu um erro interno no servidor"})
            }
        }
        next();
    }
}

const errorHandlerMiddleware = new ErrorHandlerMiddleware();

export {errorHandlerMiddleware}