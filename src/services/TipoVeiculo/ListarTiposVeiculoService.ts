import { tipoVeiculoRepository } from "../../repositories/TipoVeiculoRepository";

class ListarTiposVeiculoService{
    async execute(){
        let tiposVeiculo = await tipoVeiculoRepository.listar();
        return tiposVeiculo;
    }
}

const listarTiposVeiculoService = new ListarTiposVeiculoService();

export {listarTiposVeiculoService}