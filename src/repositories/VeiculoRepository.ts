import { connection } from "../models/connect";

class VeiculoRepository {

    async listar(){
        const sql = "SELECT * FROM Veiculo";
        const [veiculos] = await connection.execute(sql);
        return veiculos;
    }

    async buscarPorId(id: number){
        const sql = "SELECT * FROM Veiculo WHERE idVeiculo=?";
        const [veiculo] = await connection.execute(sql, [id]);
        return veiculo;
    }

    async buscarPorPlaca(placa: string){
        const sql = "SELECT * FROM Veiculo WHERE Placa=?";
        const [veiculo] = await connection.execute(sql, [placa]);
        return veiculo;
    }

    async cadastrar(modelo: string, placa: string, valor: number, tipoVeiculo: number) {
        const sql = "INSERT INTO Veiculo (Modelo, Placa, Valor, TipoVeiculo) VALUES (?, ?, ?, ?)";
        const [veiculo] = await connection.execute(sql, [modelo, placa, valor, tipoVeiculo]);
        return veiculo;
    }

    async baixar(id: number){
        const sql = "UPDATE Veiculo SET Baixado=1 WHERE idVeiculo=?";
        const [veiculo] = await connection.execute(sql, [id]);
        return veiculo;
    }

    async reativar(id: number){
        const sql = "UPDATE Veiculo SET Baixado=0 WHERE idVeiculo=?";
        const [veiculo] = await connection.execute(sql, [id]);
        return veiculo;
    }

    async listarVeiculosAtivos(){
        const sql = "SELECT * FROM Veiculo WHERE Baixado=0";
        const [veiculos] = await connection.execute(sql);
        return veiculos;
    }

    async listarVeiculosBaixados(){
        const sql = "SELECT * FROM Veiculo WHERE Baixado=1";
        const [veiculos] = await connection.execute(sql);
        return veiculos;
    }
}

const veiculoRepository =  new VeiculoRepository();

export {veiculoRepository};