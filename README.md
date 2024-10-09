# ts-react-todo-list

Esta aplicação fullstack, RESTful, consiste em uma todo list: onde o usuário pode cadastrar-se; logar; adicionar; deletar; editar e visualizar tarefas. 

Tecnologias utilizadas (stack): Node.js - TypeScript - React - Docker. 

# Como rodar a aplicação:

Para rodar a aplicação em modo teste, onde serão testadas todas as rotas, na raíz do projeto utilize o comando:
`sudo docker compose --profile test up --build`

Para rodar em produção ou homologação (localmente):
`sudo docker compose --profile development up --build`

# Considerações:

O backend já está completo, acesse o diretório /backend para visualizar. o front end ainda não foi iniciado.