import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { clienteRepository } from "../../repositories/ClienteRepository";
import { locacaoRepository } from "../../repositories/LocacaoRepository";

class HistoricoClienteService {
    async execute(id: number) {
        if(!id){
            throw new AppError("ERRO! Id não informado");
        }
        const [cliente]: any = await clienteRepository.buscarPorId(id);
        if(!cliente){
            throw new AppError("ERRO! Cliente não encontrado", StatusCodes.NOT_FOUND);
        }
        const locacoes = await locacaoRepository.historicoCliente(id);
        return locacoes;
    }
}

const historicoClienteService = new HistoricoClienteService();

export {historicoClienteService};