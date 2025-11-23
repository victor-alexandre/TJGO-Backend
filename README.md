# API Garçom Eletrônico 🍽️

Repositório com as atividades feitas na Disciplina de Backend da UFG em colaboração com o TJGO. O sistema consiste numa API REST para gerenciar o fluxo de pedidos, mesas e pagamentos de um restaurante.

## 👥 Membros do Grupo

- [José Solenir Lima Figuerêdo](https://github.com/Solenir)
- [Owen Alves Lima](https://github.com/mr0wen)
- [Renato Aparecido dos Santos Júnior](https://github.com/renatojunior0)
- [Victor Alexandre de Carvalho Coelho](https://github.com/victor-alexandre)

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web para criação da API.
- **Sequelize**: ORM para modelagem e interação com o banco de dados.
- **SQLite**: Banco de dados relacional (arquivo local para desenvolvimento).

## 📋 Estrutura do Projeto

A aplicação segue o padrão MVC (Model-View-Controller), focando na camada de **Models** (Domínio).

```bash
├── src/
│   ├── config/         # Configuração do banco de dados
│   ├── models/         # Definição das Classes de Domínio (Tabelas)
│   ├── index.js        # Entrypoint do servidor
│   ├── sync.js         # Script para sincronização de tabelas (reset/update)
│   └── seed.js         # Script para popular o banco com dados de teste
├── dev.sqlite          # Arquivo do banco de dados (gerado automaticamente)
└── package.json        # Dependências e scripts
```

## 🚀 Como Executar o Projeto

1. Pré-requisitos
   Certifique-se de ter o Node.js instalado em sua máquina.

2. Instalação
   Clone o repositório e instale as dependências:

```bash
npm install
```

3. Configuração Inicial (Seed)
   Para criar as tabelas e inserir dados iniciais de teste (Restaurante, Mesas, Cardápio, Usuários), execute:

```bash
npm run seed
```

4. Outros Comandos de Banco de Dados
   Se desejar apenas atualizar a estrutura das tabelas (após modificar um Model) sem apagar os dados:

```bash
npm run sync
```

5. Iniciando o Servidor
   Para rodar a API em modo de desenvolvimento:

```bash
npm run dev
```

O servidor iniciará em: http://localhost:3000

## 📖 Testando a API (Swagger)

A maneira mais fácil de visualizar e testar as rotas disponíveis é através do **Swagger UI**.

Com o servidor rodando, acesse em seu navegador:

👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

Lá você poderá:
- Visualizar todos os endpoints disponíveis.
- Consultar os esquemas de dados (JSON) esperados.
- **Testar as requisições ("Try it out")** diretamente pelo navegador sem precisar de ferramentas externas.

## 🧪 Testando a API (Postman, Insomnia)

Com o servidor rodando, você pode verificar se está ativo acessando a rota raiz no seu navegador ou Postman/Insomnia:

GET http://localhost:3000/ -> Retorna mensagem de boas-vindas ("API Garçom Eletrônico no ar!").

(As demais rotas CRUD serão implementadas nas próximas etapas do trabalho).
