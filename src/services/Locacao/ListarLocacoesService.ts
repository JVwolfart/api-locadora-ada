import { locacaoRepository } from "../../repositories/LocacaoRepository";

class ListarLocacoesService {
    async execute(){
        let locacoes = await locacaoRepository.listar();
        return locacoes;
    }
}

const listarLocaocesService = new ListarLocacoesService();

export {listarLocaocesService};