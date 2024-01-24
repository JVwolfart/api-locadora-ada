import { veiculoRepository } from "../../repositories/VeiculoRepository";

class ListarVeiculosAtivosService {
    async execute() {
        let veiculos = await veiculoRepository.listarVeiculosAtivos();
        return veiculos;
    }
}

const listarVeiculosAtivosService = new ListarVeiculosAtivosService();

export {listarVeiculosAtivosService}