import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { listarTiposVeiculoService } from "../services/TipoVeiculo/ListarTiposVeiculoService";
import { buscarTipoVeiculoService } from "../services/TipoVeiculo/BuscarTipoVeiculoService";
import { cadastrarTipoVeiculoService } from "../services/TipoVeiculo/CadastrarTipoVeiculoService";

class TipoVeiculoController {

    async listar(req: Request, res: Response, next: NextFunction){
        const tiposVeiculo = await listarTiposVeiculoService.execute();
        return res.send(tiposVeiculo);
    }

    async cadastrar(req: Request, res: Response, next: NextFunction){
        try {
            const {tipoVeiculo, acrescimo, habilitacao} = req.body;
            const novoTipo = await cadastrarTipoVeiculoService.execute(tipoVeiculo, acrescimo, habilitacao);
            res.status(StatusCodes.CREATED).send(novoTipo);
            next();
        } catch (error) {
            next(error);
        }
    }

    async buscar(req: Request, res: Response, next: NextFunction){
        try {
            const id: number = parseInt(req.params.id);
            const tipoVeiculo = await buscarTipoVeiculoService.execute(id);
            res.send(tipoVeiculo);
            next();
        } catch (error) {
            next(error);
        }
    }
}

const  tipoVeiculoController = new TipoVeiculoController();

export {tipoVeiculoController};