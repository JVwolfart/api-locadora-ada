import { Request, Response, NextFunction } from "express";
import { listarVeiculosService } from "../services/Veiculo/ListarVeiculosService";
import { cadastrarVeiculoService } from "../services/Veiculo/CadastrarVeiculoService";
import { StatusCodes } from "http-status-codes";
import { baixarVeiculoService } from "../services/Veiculo/BaixarVeiculoService";
import { reativarVeiculoService } from "../services/Veiculo/ReativarVeiculoService";
import { listarVeiculosAtivosService } from "../services/Veiculo/ListarVeiculosAtivosService";
import { listarVeiculosBaixadosService } from "../services/Veiculo/ListarVeiculosBaixadosService";

class VeiculoController {
    async listar(req: Request, res: Response, next: NextFunction){
        const veiculos = await listarVeiculosService.execute();
        res.send(veiculos);
    }

    async listarVeiculosAtivos(req: Request, res: Response, next: NextFunction){
        const veiculos = await listarVeiculosAtivosService.execute();
        res.send(veiculos);
    }

    async listarVeiculosBaixados(req: Request, res: Response, next: NextFunction){
        const veiculos = await listarVeiculosBaixadosService.execute();
        res.send(veiculos);
    }

    async cadastrar(req: Request, res: Response, next: NextFunction){
        try {
            const {modelo, placa, valor, idTipoVeiculo} = req.body;
            const novoVeiculo = await cadastrarVeiculoService.execute(modelo, placa, valor, idTipoVeiculo);
            res.status(StatusCodes.CREATED).send(novoVeiculo)
            next();
        } catch (error) {
            next(error);
        }
    }

    async baixar(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params;
            const veiculoBaixado = await baixarVeiculoService.execute(parseInt(id));
            res.status(StatusCodes.OK).send(veiculoBaixado);
            next();
        } catch (error) {
            next(error);
        }
    }

    async reativar(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params;
            const veiculoReativado = await reativarVeiculoService.execute(parseInt(id));
            res.status(StatusCodes.OK).send(veiculoReativado);
            next();
        } catch (error) {
            next(error);
        }
    }
}

const veiculoController = new VeiculoController();

export {veiculoController};