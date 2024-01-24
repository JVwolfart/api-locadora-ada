import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { veiculoRepository } from "../../repositories/VeiculoRepository";

class ReativarVeiculoService {
    async execute(id: number){
        if(!id){
            throw new AppError("ERRO! Id não informado");
        }
        const [veiculo]: any = await veiculoRepository.buscarPorId(id);
        if(!veiculo){
            throw new AppError("ERRO! Veículo não encontrado", StatusCodes.NOT_FOUND);
        }
        if(!veiculo.Baixado){
            throw new AppError("ERRO! Este veículo já se encontra ativo");
        }
        const veiculoReativado = await veiculoRepository.reativar(id);
        return veiculoReativado;
    }
}

const reativarVeiculoService = new ReativarVeiculoService();

export {reativarVeiculoService};