import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { tipoVeiculoRepository } from "../../repositories/TipoVeiculoRepository";

class CadastrarTipoVeiculoService {
    async execute(tipoVeiculo: string, acrescimo: number, tipoCarteira: string){
        if(!tipoVeiculo || !acrescimo || !tipoCarteira){
            throw new AppError("ERRO! Obrigatório informar o tipo de veículo, tipo de habilitação e acréscimo", StatusCodes.BAD_REQUEST);
        }
        if(acrescimo <= 0){
            throw new AppError("ERRO! Acréscimo precisa ser positivo");
        }

        tipoCarteira = tipoCarteira.toUpperCase();
        tipoVeiculo = tipoVeiculo.toUpperCase();
        
        const TIPOS_CARTEIRA = ["A", "B", "C", "D", "E"];
        if(!TIPOS_CARTEIRA.includes(tipoCarteira)){
            throw new AppError("ERRO! Tipo de carteira informado inválido");
        }

        const novoTipo = await tipoVeiculoRepository.cadastrar(tipoVeiculo, acrescimo, tipoCarteira);
        return novoTipo;
    }
}

const cadastrarTipoVeiculoService = new CadastrarTipoVeiculoService();

export {cadastrarTipoVeiculoService}