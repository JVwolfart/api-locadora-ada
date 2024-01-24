import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { locacaoRepository } from "../../repositories/LocacaoRepository";
import { tipoVeiculoRepository } from "../../repositories/TipoVeiculoRepository";
import { veiculoRepository } from "../../repositories/VeiculoRepository";
import { strPDataBanco, validaData, validaHora } from "../../utils";

class RegistrarDevolucaoService {
    async execute(id: number, dataDevolucao: string, horaDevolucao: string){
        if(!id || !dataDevolucao || !horaDevolucao){
            throw new AppError("ERRO! Algum campo não foi informado");
        }
        if(!validaData(dataDevolucao)){
            throw new AppError("ERRO! Data da devolução inválida");
        }
        if(!validaHora(horaDevolucao)){
            throw new AppError("ERRO! Hora da devolução inválida");
        }
        const [locacao]: any = await locacaoRepository.buscarPorId(id);
        if(!locacao){
            throw new AppError("ERRO! Locação não encontrada", StatusCodes.NOT_FOUND);
        }
        if(locacao.DataDevolucao){
            throw new AppError("ERRO! Esta locação já foi devolvida");
        }
        let dtLocacao = new Date(locacao.DataLocacao);
        const dtDevolucaoSf = `${strPDataBanco(dataDevolucao)} ${horaDevolucao}`;
        let dtDevolucao = new Date(dtDevolucaoSf);
        if(dtLocacao >= dtDevolucao){
            throw new AppError("ERRO! Data de devolução não pode ser anterior a data de locação");
        }
        const [veiculo]: any = await veiculoRepository.buscarPorId(locacao.IdVeiculo);
        const [tipVeiculo]: any = await tipoVeiculoRepository.buscar(veiculo.TipoVeiculo)
        
        const locacaoAlterada = await locacaoRepository.devolver(id, dtDevolucaoSf, tipVeiculo.Acrescimo);
        return locacaoAlterada
    }
}

const registrarDevolucaoService = new RegistrarDevolucaoService();

export {registrarDevolucaoService}