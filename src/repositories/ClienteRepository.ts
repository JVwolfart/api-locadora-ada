import { connection } from "../models/connect";


class ClienteRepository {
    async listar(){
        const sql = "SELECT * FROM Cliente";
        const [clientes] = await connection.execute(sql);
        return clientes;
    }

    async buscarPorId(id: number){
        const sql = "SELECT * FROM Cliente WHERE idCliente=?";
        const [cliente] = await connection.execute(sql, [id]);
        return cliente;
    }

    async buscarPorCpf(cpf: string){
        const sql = "SELECT * FROM Cliente WHERE CPF=?";
        const [cliente] = await connection.execute(sql, [cpf]);
        return cliente;
    }

    async cadastrar(nome: string, cpf: string, tipoCarteira: string){
        const sql = "INSERT INTO Cliente (Nome, CPF, TipoHabilitacao) VALUES (?, ?, ?)";
        const [novoCliente] = await connection.execute(sql, [nome, cpf, tipoCarteira]);
        return novoCliente;
    }

    async desativar(id: number){
        const sql = "UPDATE Cliente SET Ativo=0 WHERE idCliente=?";
        const [cliente] = await connection.execute(sql, [id]);
        return cliente;
    }

    async reativar(id: number){
        const sql = "UPDATE Cliente SET Ativo=1 WHERE idCliente=?";
        const [cliente] = await connection.execute(sql, [id]);
        return cliente;
    }

    async listarClientesAtivos(){
        const sql = "SELECT * FROM Cliente WHERE Ativo=1";
        const [clientes] = await connection.execute(sql);
        return clientes;
    }

    async listarClientesInativos(){
        const sql = "SELECT * FROM Cliente WHERE Ativo=0";
        const [clientes] = await connection.execute(sql);
        return clientes;
    }
}

const clienteRepository = new ClienteRepository();

export {clienteRepository}