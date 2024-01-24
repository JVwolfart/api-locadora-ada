import { connection } from "../models/connect";

class TipoVeiculoRepository {
    listar = async() => {
        const sql = "SELECT * FROM TipoVeiculo";
        const [tiposVeiculo] = await connection.execute(sql);
        return tiposVeiculo;
    }

    async buscar(id: number){
        const sql = "SELECT * FROM TipoVeiculo WHERE idTipoVeiculo=?";
        const [tipoVeiculo] = await connection.execute(sql, [id]);
        return tipoVeiculo;
    }

    async cadastrar(tipoVeiculo: string, acrescimo: number, tipoCarteira: string){
        const sql = "INSERT INTO TipoVeiculo (TipoVeiculo, Acrescimo, HabilitacaoNecessaria) VALUES (?, ?, ?)";
        const [novoTipo] = await connection.execute(sql, [tipoVeiculo, acrescimo, tipoCarteira]);
        return novoTipo;
    }
}

const tipoVeiculoRepository = new TipoVeiculoRepository();

export {tipoVeiculoRepository};