import { AppError } from "../../errors/AppError";
import { clienteRepository } from "../../repositories/ClienteRepository";
import { validaCPF } from "../../utils";

class CadastrarClienteService {
    async execute(nome: string, cpf: string, tipoCarteira: string){
        if(!nome || !cpf || !tipoCarteira){
            throw new AppError("ERRO! Todos os campos devem ser enviados");
        }
        if(!validaCPF(cpf)){
            throw new AppError("ERRO! CPF invalido");
        }
        const cpfExiste: any = await clienteRepository.buscarPorCpf(cpf);
        if(cpfExiste.length !== 0){
            throw new AppError("ERRO! Este CPF já foi cadastrado no sistema");
        }
        tipoCarteira = tipoCarteira.toUpperCase();
        const TIPOS_CARTEIRA = ["A", "B", "C", "D", "E", "AB", "AC", "AD", "AE"];
        if(!TIPOS_CARTEIRA.includes(tipoCarteira)){
            throw new AppError("ERRO! Tipo de habilitação informado inválido");
        }
        const cliente = await clienteRepository.cadastrar(nome, cpf, tipoCarteira);
        return cliente;
    }
}

const cadastrarClienteService = new CadastrarClienteService();

export {cadastrarClienteService}