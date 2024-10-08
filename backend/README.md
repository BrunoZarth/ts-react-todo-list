# Backend Node.js / TypeScript

A API RESTful possui endpoints que permitem um usuário cadastrar-se, logar, adicionar, deletar, editar e visualizar tarefas. 

A API foi desenvolvido orientada a testes (TDD).

Estrutura do projeto (em bash):

Diretórios principais:
`mkdir -p src/{controllers,models,routes,services,utils} __tests__/{controllers,models,services,routes} config`

Arquivos principais:
`touch src/index.ts config/env.ts jest.config.js`

# Dependencias essenciais:

express: base para construção do servidor da aplicação, permite definir rotas, manipular requisições e respostas HTTP.

dotenv: permite setar variáveis de ambiente para manter as configuirações do projeto separadas do código.

bcryptjs: biblioteca para hashing de senhas.

jsonwebtoken: biblioteca para geração e manipulação de JWT (json web tokens).

knex: query builder que permite a manipulação do DB através de migrations.

objection: ORM para node.js que complementa o knex, permitindo interagir com o DB através de JSON.

pg: postgres, banco de dados escolhido para o projeto. 

# Dependencias de desenvolvimento:

typescript: superset de javascript que adiciona tipagem estática.

ts-node: permite executar arquivos TS diretamente no node, sem a necessidade de compilar para js a cada teste de código.

nodemon: reinicia automaticamente o servidor node a cada alteração no código, agilizando o desenvolvimento.

jest: framework de testes, essencial para o projeto desenvolvido orientado a testes (TDD).

supertest: biblioteca para testes de integração, para testar as requisições HTTP à API.

@types/node, @types/express, @types/jest, @types/supertest @types/objection: Os pacotes @types garantem ao servidor que interprete corretamente, que compreenda, as bibliotecas JS em projetos TS.

# Como criar uma nova tabela no DB (knex):
`npx knex migrate:make nome_da_tabela`