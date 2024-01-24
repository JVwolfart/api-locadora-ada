import { connection } from "../models/connect";

class LocacaoRepository {
    async listar(){
        const sql = "SELECT * FROM Locacao";
        const [locacoes] = await connection.execute(sql);
        return locacoes;
    }

    async buscarPorCliente(idCliente: number) {
        const sql = "SELECT * FROM Locacao WHERE IdCliente=?";
        const [locacoes] = await connection.execute(sql, [idCliente]);
        return locacoes;
    }

    async buscarPorVeiculo(idVeiculo: number) {
        const sql = "SELECT * FROM Locacao WHERE IdVeiculo=?";
        const [locacoes] = await connection.execute(sql, [idVeiculo]);
        return locacoes;
    }

    async buscarPorId(id: number){
        const sql = "SELECT * FROM Locacao WHERE idLocacao=?";
        const [locacoes] = await connection.execute(sql, [id]);
        return locacoes;
    }

    async veiculoAlugado(idVeiculo: number){
        const sql = "SELECT * FROM Locacao WHERE idVeiculo=? AND DataDevolucao IS NULL";
        const [alugado]: any = await connection.execute(sql, [idVeiculo]);
        return Boolean(alugado.length !== 0);
    }

    async clienteAlugando(idCliente: number){
        const sql = "SELECT * FROM Locacao WHERE idCliente=? AND DataDevolucao IS NULL";
        const [veiculoAlugado]: any = await connection.execute(sql, [idCliente]);
        return Boolean(veiculoAlugado.length !== 0);
    }

    async registrar(idCliente: number, idVeiculo: number, dataLocacao: string, previsaoDevolucao: string, valor: number){
        const sql = "INSERT INTO Locacao (IdCliente, IdVeiculo, DataLocacao, DataPrevisaoDevolucao, Valor) VALUES (?, ?, ?, ?, ?)";
        const [locacao] = await connection.execute(sql, [idCliente, idVeiculo, dataLocacao, previsaoDevolucao, valor]);
        return locacao;
    }

    async devolver(id: number, dataDevolucao: string, acrescimo: number){
        const sql = "UPDATE Locacao SET DataDevolucao=?, Acrescimo=? WHERE idLocacao=?";
        const [locacaoDevolvida] = await connection.execute(sql, [dataDevolucao, acrescimo, id]);
        return locacaoDevolvida;
    }

    async historicoCliente(id: number){
        const sql = "SELECT * FROM Locacao WHERE IdCliente=? AND DataDevolucao IS NOT NULL";
        const [locacoes] = await connection.execute(sql, [id]);
        return locacoes;
    }
}

const locacaoRepository = new LocacaoRepository();

export {locacaoRepository}