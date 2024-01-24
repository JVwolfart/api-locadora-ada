import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { locacaoRepository } from "../../repositories/LocacaoRepository";
import { veiculoRepository } from "../../repositories/VeiculoRepository";

class BaixarVeiculoService {
    async execute(id: number){
        if(!id){
            throw new AppError("ERRO! Id não informado");
        }
        const [veiculo]: any = await veiculoRepository.buscarPorId(id);
        if(!veiculo){
            throw new AppError("ERRO! Veículo não encontrado", StatusCodes.NOT_FOUND);
        }
        const veiculoAlugado = await locacaoRepository.veiculoAlugado(id);
        if(veiculoAlugado){
            throw new AppError("ERRO! Este veículo se encontra alugado no momento, portanto, não pode ser baixado");
        }
        if(veiculo.Baixado){
            throw new AppError("ERRO! Este veículo já se encontra baixado");
        }
        const veiculoBaixado = await veiculoRepository.baixar(id);
        return veiculoBaixado;
    }
}

const baixarVeiculoService = new BaixarVeiculoService();

export {baixarVeiculoService};