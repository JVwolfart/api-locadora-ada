import { Request, Response, NextFunction } from "express";
import { listarClientesService } from "../services/Cliente/ListarClientesService";
import { cadastrarClienteService } from "../services/Cliente/CadastrarClienteService";
import { StatusCodes } from "http-status-codes";
import { desativarClienteService } from "../services/Cliente/DesativarClienteService";
import { reativarClienteService } from "../services/Cliente/ReativarClienteService";
import { listarClientesAtivosService } from "../services/Cliente/ListarClientesAtivosService";
import { listarClientesInativosService } from "../services/Cliente/ListarClientesInativos";

class ClienteController {
    async listar(req: Request, res: Response, next: NextFunction){
        const clientes = await listarClientesService.execute();
        res.send(clientes);
    }

    async listarClientesAtivos(req: Request, res: Response, next: NextFunction){
        const clientes = await listarClientesAtivosService.execute();
        res.send(clientes);
    }

    async listarClientesInativos(req: Request, res: Response, next: NextFunction){
        const clientes = await listarClientesInativosService.execute();
        res.send(clientes);
    }

    async cadastrar(req: Request, res: Response, next: NextFunction){
        try {
            const {nome, cpf, tipoHabilitacao} = req.body;
            const novoCliente = await cadastrarClienteService.execute(nome, cpf, tipoHabilitacao);
            if(!novoCliente){
                return res.status(StatusCodes.BAD_REQUEST).send({mensagem: "Erro ao cadastrar o cliente"});
            }
            res.status(StatusCodes.CREATED).send(novoCliente);
            next();
        } catch (error) {
            next(error);
        }
    }

    async desativar(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params;
            const clienteDesativado = await desativarClienteService.execute(parseInt(id));
            res.send(clienteDesativado);
            next();
        } catch (error) {
            next(error);
        }
    }

    async reativar(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params;
            const clienteReativado = await reativarClienteService.execute(parseInt(id));
            res.send(clienteReativado);
            next();
        } catch (error) {
            next(error);
        }
    }
}

const clienteController = new ClienteController();

export {clienteController}