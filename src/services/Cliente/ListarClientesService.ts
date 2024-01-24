import { clienteRepository } from "../../repositories/ClienteRepository";

class ListarClientesService {
    async execute(){
        const clientes = await clienteRepository.listar();
        return clientes;
    }
}

const listarClientesService = new ListarClientesService();

export {listarClientesService};