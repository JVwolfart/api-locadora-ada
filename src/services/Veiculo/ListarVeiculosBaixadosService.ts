import { veiculoRepository } from "../../repositories/VeiculoRepository";

class ListarVeiculosBaixadosService {
    async execute() {
        let veiculos = await veiculoRepository.listarVeiculosBaixados();
        return veiculos;
    }
}

const listarVeiculosBaixadosService = new ListarVeiculosBaixadosService();

export {listarVeiculosBaixadosService}