import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { clienteRepository } from "../../repositories/ClienteRepository";
import { locacaoRepository } from "../../repositories/LocacaoRepository";
import { tipoVeiculoRepository } from "../../repositories/TipoVeiculoRepository";
import { veiculoRepository } from "../../repositories/VeiculoRepository";
import { validaData, validaHora, strPDataBanco } from "../../utils";

class RegistarLocacaoService {
    async execute(idCliente: number, idVeiculo: number, dataLocacao: string, horaLocacao: string, dataPrevisaoDevolucao: string, horaPrevisaoDevolucao: string) {
        if(!idCliente || !idVeiculo || !dataLocacao || !horaLocacao || !dataPrevisaoDevolucao || !horaPrevisaoDevolucao){
            throw new AppError("ERRO! Nenhum campo pode ficar vazio");
        }
        if(!validaData(dataLocacao) || !validaData(dataPrevisaoDevolucao)){
            throw new AppError("ERRO! Data da locação ou previsão de devolução inválidas");
        }
        if(!validaHora(horaLocacao) || !validaHora(horaPrevisaoDevolucao)){
            throw new AppError("ERRO! Hora da locação ou previsão de devolução inválidas");
        }
        
        const veiculoIndisponivel: boolean = await locacaoRepository.veiculoAlugado(idVeiculo);
        if(veiculoIndisponivel){
            throw new AppError("ERRO! Este veículo não pode ser alugado, pois está alugado para outro cliente");
        }
        const clienteIndisponivel: boolean = await locacaoRepository.clienteAlugando(idCliente);
        if(clienteIndisponivel){
            throw new AppError("ERRO! Este cliente já possui um veículo alugado no momento, portanto, não pode alugar outro");
        }
        const [cliente]: any = await clienteRepository.buscarPorId(idCliente);
        if(!cliente){
            throw new AppError("ERRO! Cliente não encontrado", StatusCodes.NOT_FOUND);
        }
        const [veiculo]: any = await veiculoRepository.buscarPorId(idVeiculo);
        if(!veiculo){
            throw new AppError("ERRO! Veículo não encontrado", StatusCodes.NOT_FOUND);
        }
        const [tipoVeiculo]: any = await tipoVeiculoRepository.buscar(veiculo.TipoVeiculo);
        if(!cliente.TipoHabilitacao.includes(tipoVeiculo.HabilitacaoNecessaria)){
            throw new AppError("ERRO! Este cliente não possui a habilitação necessária para este tipo de veículo");
        }
        if(!cliente.Ativo){
            throw new AppError("ERRO! Este cliente se encontra inativo no momento, portanto, não pode realizar locações");
        }
        if(veiculo.Baixado){
            throw new AppError("ERRO! Este veículo se encontra baixado no momento, portanto, não pode ser alugado");
        }
        let dtLocacaoSf = `${strPDataBanco(dataLocacao)} ${horaLocacao}`;
        let dtPrevisaoDevolucaoSf = `${strPDataBanco(dataPrevisaoDevolucao)} ${horaPrevisaoDevolucao}`
        let dtLocacao: Date | string = new Date(dtLocacaoSf);
        let previsaoDevolucao: Date | string = new Date(dtPrevisaoDevolucaoSf);
        if(previsaoDevolucao <= dtLocacao){
            throw new AppError("ERRO! Data de locação deve ser anterior a previsão de devolução");
        }
        const locacao = await locacaoRepository.registrar(idCliente, idVeiculo, dtLocacaoSf, dtPrevisaoDevolucaoSf, veiculo.Valor);
        return locacao;
    }
}

const registrarLocacaoService = new RegistarLocacaoService();

export {registrarLocacaoService}