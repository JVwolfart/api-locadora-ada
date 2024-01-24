import { clienteRepository } from "../../repositories/ClienteRepository";

class ListarClientesInativosService {
    async execute(){
        const clientes = await clienteRepository.listarClientesInativos();
        return clientes;
    }
}

const listarClientesInativosService = new ListarClientesInativosService();

export {listarClientesInativosService};