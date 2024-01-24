import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { clienteRepository } from "../../repositories/ClienteRepository";

class ReativarClienteService {
    async execute(id: number){
        if(!id){
            throw new AppError("ERRO! Id não informado");
        }
        let [cliente]: any = await clienteRepository.buscarPorId(id);
        if(!cliente){
            throw new AppError("ERRO! Cliente não encontrado", StatusCodes.NOT_FOUND);
        }
        if(cliente.Ativo){
            throw new AppError("ERRO! Cliente já está ativo");
        }
        let clienteReativado = await clienteRepository.reativar(id);
        return clienteReativado;
    }
}

const reativarClienteService = new ReativarClienteService();

export {reativarClienteService};