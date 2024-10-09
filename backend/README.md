# Backend Node.js / TypeScript

A API RESTful possui endpoints que permitem cadastrar; logar; deletar; editar; buscar todos os usuários ou por email. bem como, caso o usuário esteja logado, deletar, editar, buscar e adicionar novas tarefas. 

A API foi desenvolvido orientada a testes (TDD), utiliza dois bancos de dados e migrations (knex): postgres para produção e sqlite para testes e roda via Docker compose.

# Como funciona a API:

Ao cadastrar um usuário via POST através da rota /api/users - passando via JSON email e senha - você poderá logar para receber um token de autenticação JWT. através deste token o usuário tem acesso às funções de criar, deletar, buscar e modificar tarefas, bem como deletar usuários. 

# Como rodar a aplicação:

Para rodar a api em modo teste, onde serão testadas todas as rotas, na raíz do projeto (um diretório acima deste) utilize o comando:
`sudo docker compose --profile test up --build`

Para rodar em produção ou homologação (localmente):
`sudo docker compose --profile development up --build`

# Dependências essenciais:

express: base para construção do servidor da aplicação, permite definir rotas, manipular requisições e respostas HTTP.

dotenv: permite setar variáveis de ambiente para manter as configurações do projeto separadas do código.

bcryptjs: biblioteca para hashing de senhas.

jsonwebtoken: biblioteca para geração e manipulação de JWT (json web tokens).

knex: query builder que permite a manipulação do DB através de migrations.

objection: ORM para Node.js que complementa o Knex, permitindo interagir com o DB através de JSON.

pg: postgres, banco de dados escolhido para o projeto. 

sqlite3: banco de dados em memória para lidar com testes.

tsconfig-paths: biblioteca que auxilia na resolução de módulos com base nos paths configurados no arquivo `tsconfig.json`, facilitando a importação de arquivos em TypeScript.

tsx: biblioteca para execução rápida de arquivos TypeScript sem a necessidade de compilar previamente, similar ao `ts-node`, mas com foco em desempenho e simplicidade.

# Dependências de desenvolvimento:

typescript: superset de JavaScript que adiciona tipagem estática.

ts-node: permite executar arquivos TypeScript diretamente no Node.js, sem a necessidade de compilar para JavaScript a cada teste de código.

nodemon: reinicia automaticamente o servidor Node a cada alteração no código, agilizando o desenvolvimento.

jest: framework de testes, essencial para o projeto desenvolvido orientado a testes (TDD).

supertest: biblioteca para testes de integração, para testar as requisições HTTP à API.

ts-jest: biblioteca que integra o Jest com TypeScript, permitindo rodar testes escritos em TypeScript sem precisar de compilações intermediárias.

ts-node-dev: ferramenta de desenvolvimento que combina `ts-node` e `nodemon`, proporcionando reinício automático do servidor com suporte para TypeScript durante o desenvolvimento.

@types: os pacotes @types garantem ao servidor que interprete corretamente as bibliotecas JavaScript em projetos TypeScript, oferecendo suporte de tipagem para bibliotecas que não possuem typings nativos.


# Como criar uma nova tabela no DB (knex):
`npx knex migrate:make nome_da_tabela`
