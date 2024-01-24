import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { clienteRepository } from "../../repositories/ClienteRepository";
import { locacaoRepository } from "../../repositories/LocacaoRepository";
import { tipoVeiculoRepository } from "../../repositories/TipoVeiculoRepository";
import { veiculoRepository } from "../../repositories/VeiculoRepository";
import { calculaNDias, calculaNHoras } from "../../utils";

class EmitirFaturaService {
    async execute(id: number){
        if(!id){
            throw new AppError("ERRO! Obrigadtório informar o id da fatura");
        }
        const [locacao]: any = await locacaoRepository.buscarPorId(id);
        if(!locacao){
            throw new AppError("ERRO! Locação não encontrada", StatusCodes.NOT_FOUND);
        }
        if(!locacao.DataDevolucao){
            throw new AppError("ERRO! Essa locação ainda não foi devolvida");
        }
        let fatura = {}
        fatura["id"] = id;
        fatura["dataLocacao"] = locacao.DataLocacao;
        fatura["dataDevolucao"] = locacao.DataDevolucao;
        let dtLocacao = new Date(locacao.DataLocacao);
        let dtDevolucao = new Date(locacao.DataDevolucao);
        fatura["nDias"] = calculaNDias(dtLocacao, dtDevolucao);
        fatura["nHoras"] = calculaNHoras(dtLocacao, dtDevolucao) % 24;
        let [veiculo]: any = await veiculoRepository.buscarPorId(locacao.IdVeiculo);
        let [tipoVeiculo]: any = await tipoVeiculoRepository.buscar(veiculo.TipoVeiculo);
        fatura["veiculo"] = veiculo.Modelo;
        fatura["placa"] = veiculo.Placa;
        let [cliente]: any = await clienteRepository.buscarPorId(locacao.IdCliente);
        fatura["cliente"] = cliente.Nome;
        fatura["cpf"] = cliente.CPF;
        fatura["tipoHabilitacao"] = cliente.TipoHabilitacao;
        fatura["valorHora"] = locacao.Valor;
        let nHoras = calculaNHoras(dtLocacao, dtDevolucao);
        let totHoras = locacao.Valor * nHoras;
        fatura["subTotal"] = totHoras;
        fatura["acrescimo"] = tipoVeiculo.Acrescimo;
        let totAcrescimo = totHoras*(tipoVeiculo.Acrescimo/100);
        fatura["totAcrescimo"] = totAcrescimo;
        let totalFatura = totHoras+totAcrescimo;
        fatura["totalFatura"] = totalFatura;
        return fatura;
    }
}

const emitirFaturaService = new EmitirFaturaService();

export {emitirFaturaService};