import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { tipoVeiculoRepository } from "../../repositories/TipoVeiculoRepository";

class BuscarTipoVeiculoService {
    async execute(id: number){
        const [tipoVeiculo]: any = await tipoVeiculoRepository.buscar(id);
        if(!tipoVeiculo){
            throw new AppError("Tipo de veículo não encontrado!", StatusCodes.NOT_FOUND);
        }
        return tipoVeiculo;
    }
}

const buscarTipoVeiculoService = new BuscarTipoVeiculoService();

export {buscarTipoVeiculoService}