# Turma 1090 Vem Ser Tech Back End Ada iFood

## API para sistema de locadora de veículos.


### O desafio:

Este desafio consiste em criar uma API para o sistema desenvolvido no módulo 2 deste curso (para saber mais sobre este sistema e suas regras de negócio, [acesse esse link](https://github.com/JVwolfart/projeto-locadora-ada-grupo)). 

Essa API deveria ser criada utilizando TypeScript, e o framework Express do node.js, utilizando os conhecimentos que adquirimos no curso.


### Requisitos

Utilizando o projeto da locadora de veículos, implemente rotas utilizando [express](https://expressjs.com/pt-br/) que permitam o acesso às funcionalidades do sistema por meio de chamadas HTTP, seguindo os seguintes requisitos:
1. Escolha, no mínimo, 4 métodos e implemente as rotas equivalentes. Atentem-se para a utilização dos métodos HTTP mais adequados para cada situação.

2. Seu software deve implementar, no mínimo, 2 middlewares personalizados.

3. Mantenha a configuração das rotas em um arquivo separado
  
4. Na medida do possível, utilize a divisão de camadas (Controller, Service e Repository) em seu projeto.

### Resultado final

No final do projeto, desenvolvi as seguintes rotas:

- Listar tipos de veículo
- Buscar tipo de veículo por id
- Cadastrar tipo de veículo
- Listar todos os veículos
- Cadastrar veículo
- Baixar veículo
- Reativar veículo
- Listar veículos ativos
- Listar veículos baixados
- Listar todos os clientes
- Cadastrar cliente
- Desativar cliente
- Reativar cliente
- Listar clientes ativos
- Listar clientes inativos
- Listar locações
- Registrar locação
- Registrar devolução
- Emitir fatura
- Bucar histórico do cliente

Além disso, implementei 2 middlewares personalizados, sendo um para tratar os erros, e outro para imprimir a data e hora da requisição no console.

Este projeto também faz integração com banco de dados MySQL,então é necessário ter o MySQL instalado na sua máquina para rodar este projeto, e para realizar a configuração das variáveis de ambiente, basta editar o arquivo .env.example.

Para criar o banco de dados conforme esse projeto, utilize os comandos SQL abaixo.

CREATE TABLE `TipoVeiculo` (
  `idTipoVeiculo` int NOT NULL AUTO_INCREMENT,
  `TipoVeiculo` varchar(45) NOT NULL,
  `Acrescimo` decimal(5,2) NOT NULL,
  `HabilitacaoNecessaria` enum('A','B','C','D','E') NOT NULL,
  PRIMARY KEY (`idTipoVeiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Veiculo` (
  `idVeiculo` int NOT NULL AUTO_INCREMENT,
  `Modelo` varchar(45) NOT NULL,
  `Placa` varchar(8) NOT NULL,
  `Valor` decimal(6,2) NOT NULL,
  `TipoVeiculo` int NOT NULL,
  `Baixado` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`idVeiculo`),
  UNIQUE KEY `Placa_UNIQUE` (`Placa`),
  KEY `TipoVeiculo_idx` (`TipoVeiculo`),
  CONSTRAINT `TipoVeiculo` FOREIGN KEY (`TipoVeiculo`) REFERENCES `TipoVeiculo` (`idTipoVeiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Cliente` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `CPF` varchar(15) NOT NULL,
  `TipoHabilitacao` enum('A','B','C','D','E','AB','AC','AD','AE') NOT NULL,
  `Ativo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `CPF_UNIQUE` (`CPF`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Locacao` (
  `idLocacao` int NOT NULL AUTO_INCREMENT,
  `IdCliente` int NOT NULL,
  `IdVeiculo` int NOT NULL,
  `DataLocacao` datetime NOT NULL,
  `DataPrevisaoDevolucao` datetime NOT NULL,
  `DataDevolucao` datetime DEFAULT NULL,
  `Valor` decimal(8,2) DEFAULT NULL,
  `Acrescimo` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`idLocacao`),
  UNIQUE KEY `Locacao_idx` (`IdCliente`,`IdVeiculo`,`DataLocacao`),
  KEY `IdCliente_idx` (`IdCliente`),
  KEY `IdVeiculo_idx` (`IdVeiculo`),
  CONSTRAINT `IdCliente` FOREIGN KEY (`IdCliente`) REFERENCES `Cliente` (`idCliente`),
  CONSTRAINT `IdVeiculo` FOREIGN KEY (`IdVeiculo`) REFERENCES `Veiculo` (`idVeiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


Feito tudo isso, não se esqueça de rodar o comando npm install para instalar todas as dependências deste projeto.
