import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { clienteRepository } from "../../repositories/ClienteRepository";
import { locacaoRepository } from "../../repositories/LocacaoRepository";

class DesativarClienteService {
    async execute(id: number){
        if(!id){
            throw new AppError("ERRO! Id não informado");
        }
        let [cliente]: any = await clienteRepository.buscarPorId(id);
        if(!cliente){
            throw new AppError("ERRO! Cliente não encontrado", StatusCodes.NOT_FOUND);
        }
        if(!cliente.Ativo){
            throw new AppError("ERRO! Cliente já está desativado");
        }
        let clienteIndisponivel = await locacaoRepository.clienteAlugando(id);
        if(clienteIndisponivel){
            throw new AppError("ERRO! Este cliente não pode ser desativado no momento, pois possui um veículo alugado");
        }
        let clienteDesativado = await clienteRepository.desativar(id);
        return clienteDesativado;
    }
}

const desativarClienteService = new DesativarClienteService();

export {desativarClienteService};