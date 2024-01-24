import { veiculoRepository } from "../../repositories/VeiculoRepository";

class ListarVeiculosService {
    async execute() {
        let veiculos = await veiculoRepository.listar();
        return veiculos;
    }
}

const listarVeiculosService = new ListarVeiculosService();

export {listarVeiculosService}