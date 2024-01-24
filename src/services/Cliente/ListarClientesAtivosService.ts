import { clienteRepository } from "../../repositories/ClienteRepository";

class ListarClientesAtivosService {
    async execute(){
        const clientes = await clienteRepository.listarClientesAtivos();
        return clientes;
    }
}

const listarClientesAtivosService = new ListarClientesAtivosService();

export {listarClientesAtivosService};