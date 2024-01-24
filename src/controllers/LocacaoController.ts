import { NextFunction, Request, Response } from "express";
import { listarLocaocesService } from "../services/Locacao/ListarLocacoesService";
import { registrarLocacaoService } from "../services/Locacao/RegistrarLocacaoService";
import { StatusCodes } from "http-status-codes";
import { registrarDevolucaoService } from "../services/Locacao/RegistrarDevolucaoService";
import { emitirFaturaService } from "../services/Locacao/EmitirFaturaService";
import { historicoClienteService } from "../services/Locacao/HistoricoClienteService";

class LocacaoController {
    async listar(req: Request, res: Response, next: NextFunction){
        const locacoes = await listarLocaocesService.execute();
        res.send(locacoes);
    }

    async registrar(req: Request, res: Response, next: NextFunction){
        try {
            const {idCliente, idVeiculo, dataLocacao, horaLocacao, dataPrevisaoDevolucao, horaPrevisaoDevolucao} = req.body;
            const locacao = await registrarLocacaoService.execute(idCliente, idVeiculo, dataLocacao, horaLocacao, dataPrevisaoDevolucao, horaPrevisaoDevolucao);
            res.status(StatusCodes.CREATED).send(locacao);
            next();
        } catch (error) {
            next(error);
        }
    }

    async devolver(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params;
            const {dataDevolucao, horaDevolucao} = req.body;
            const locacaoAlterada = await registrarDevolucaoService.execute(parseInt(id), dataDevolucao, horaDevolucao);
            res.send(locacaoAlterada);
            next();
        } catch (error) {
            next(error);
        }
    }

    async fatura(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params;
            const fatura = await emitirFaturaService.execute(parseInt(id));
            res.send(fatura);
            next();
        } catch (error) {
            next(error);
        }
    }

    async historicoCliente(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params;
            const locacoes = await historicoClienteService.execute(parseInt(id));
            res.send(locacoes);
            next();
        } catch (error) {
            next(error);
        }
    }
}

const locacaoController = new LocacaoController();

export {locacaoController};