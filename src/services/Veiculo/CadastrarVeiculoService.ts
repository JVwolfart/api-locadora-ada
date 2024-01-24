import { AppError } from "../../errors/AppError";
import { tipoVeiculoRepository } from "../../repositories/TipoVeiculoRepository";
import { veiculoRepository } from "../../repositories/VeiculoRepository";

class CadastrarVeiculoService {
    async execute(modelo: string, placa: string, valor: number, tipoVeiculo: number) {
        const [tipoExiste]: any = await tipoVeiculoRepository.buscar(tipoVeiculo);
        modelo = modelo.toUpperCase();
        placa = placa.toUpperCase();
        if(!modelo || !placa || !valor || !tipoVeiculo){
            throw new AppError("ERRO! Obrigatório informar placa, modelo, valor e tipo do veículo");
            
        }
        if(!tipoExiste){
            throw new AppError("ERRO! Tipo informado inválido");
        }
        if(valor <= 0){
            throw new AppError("ERRO! Valor deve ser positivo");
        }
        const placaExiste: any = await veiculoRepository.buscarPorPlaca(placa);
        if(placaExiste.length !== 0){
            throw new AppError("ERRO! Esta placa já foi cadastrada para outro veículo");
        }
        const veiculo = await veiculoRepository.cadastrar(modelo, placa, valor, tipoVeiculo)
        return veiculo;
    }
}

const cadastrarVeiculoService = new CadastrarVeiculoService();

export {cadastrarVeiculoService}