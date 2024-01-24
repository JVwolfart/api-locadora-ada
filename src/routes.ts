import { Router } from "express";
import { tipoVeiculoController } from "./controllers/TipoVeiculoController";
import { veiculoController } from "./controllers/VeiculoController";
import { clienteController } from "./controllers/ClienteController";
import { locacaoController } from "./controllers/LocacaoController";
import { errorHandlerMiddleware } from "./middlewares/ErrorHandlerMiddleware";
import { requestDateMiddleware } from "./middlewares/RequestDateMiddleware";

const routes = Router();

routes.use(requestDateMiddleware.execute);

// TIPO VEÍCULO
routes.get("/tipo_veiculo", tipoVeiculoController.listar);
routes.get("/tipo_veiculo/:id", tipoVeiculoController.buscar)
routes.post("/tipo_veiculo", tipoVeiculoController.cadastrar);

// VEÍCULO
routes.get("/veiculo", veiculoController.listar);
routes.get("/veiculos_ativos", veiculoController.listarVeiculosAtivos);
routes.get("/veiculos_baixados", veiculoController.listarVeiculosBaixados);
routes.post("/veiculo", veiculoController.cadastrar);
routes.put("/baixar_veiculo/:id", veiculoController.baixar);
routes.put("/reativar_veiculo/:id", veiculoController.reativar)

// CLIENTE
routes.get("/cliente", clienteController.listar);
routes.get("/clientes_ativos", clienteController.listarClientesAtivos);
routes.get("/clientes_inativos", clienteController.listarClientesInativos);
routes.post("/cliente", clienteController.cadastrar);
routes.put("/desativar_cliente/:id", clienteController.desativar);
routes.put("/reativar_cliente/:id", clienteController.reativar);

// LOCAÇÃO
routes.get("/locacao", locacaoController.listar);
routes.post("/locacao", locacaoController.registrar);
routes.put("/locacao/:id", locacaoController.devolver);
routes.get("/historico/:id", locacaoController.historicoCliente);

// FATURA
routes.get("/fatura/:id", locacaoController.fatura);

routes.use(errorHandlerMiddleware.execute);

export {routes}