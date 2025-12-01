# API Garçom Eletrônico 🍽️

Repositório com as atividades feitas na Disciplina de Backend da UFG em colaboração com o TJGO. O sistema consiste numa API REST para gerenciar o fluxo de pedidos, mesas e pagamentos de um restaurante.

### 📑 Índice

* [📝 Organização do Documento](#-organização-do-documento)
* [👥 Membros do Grupo](#-membros-do-grupo)
* [🛠️ Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [📋 Estrutura do Projeto](#-estrutura-do-projeto)
* [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
* [📖 Testando a API (Swagger)](#-testando-a-api-swagger)
* [🧪 Testando a API (Postman/Insomnia)](#-testando-a-api-postman-insomnia)
* [📅 Cronograma de Desenvolvimento](#-cronograma-de-desenvolvimento)
* [📌 Status das Rotas da API](#-status-das-rotas-da-api)

---

## 📝 Organização do Documento

Este README foi estruturado para guiar desde a apresentação do time até o acompanhamento técnico do projeto:

1.  **Visão Geral:** Apresentação do time e *stack* tecnológica.
2.  **Guia Técnico:** Arquitetura de pastas e passo a passo para instalação, população do banco (*seed*) e execução.
3.  **Testes:** Instruções para consumir a API via Swagger (Documentação Interativa) ou ferramentas externas.
4.  **Gestão do Projeto:** Tabelas de controle que monitoram o cronograma geral e o status específico de implementação de cada *endpoint*.

---

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
- **Swagger**: Ferramenta para documentação e testes interativos da API.

---

## 📋 Estrutura do Projeto

A aplicação segue o padrão MVC (Model-View-Controller), focando na camada de **Models** (Domínio).

```bash
├── src/
│   ├── config/         # Configuração do banco de dados e Swagger
│   ├── controllers/    # Camada de Controle (Req/Res)
│   ├── models/         # Definição das Classes de Domínio (Tabelas)
│   ├── routes/         # Definição das Rotas da API
│   ├── services/       # Regras de Negócio
│   ├── index.js        # Entrypoint do servidor
│   ├── sync.js         # Script para sincronização de tabelas (reset/update)
│   └── seed.js         # Script para popular o banco com dados de teste
├── dev.sqlite          # Arquivo do banco de dados (gerado automaticamente)
└── package.json        # Dependências e scripts
```

---

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

---

## 📖 Testando a API (Swagger)

A maneira mais fácil de visualizar e testar as rotas disponíveis é através do **Swagger UI**.

Com o servidor rodando, acesse em seu navegador:

👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

Lá você poderá:
- Visualizar todos os endpoints disponíveis.
- Consultar os esquemas de dados (JSON) esperados.
- **Testar as requisições ("Try it out")** diretamente pelo navegador sem precisar de ferramentas externas.

---

## 🧪 Testando a API (Postman, Insomnia)

Com o servidor rodando, você pode verificar se está ativo acessando a rota raiz no seu navegador ou Postman/Insomnia:

GET http://localhost:3000/ -> Retorna mensagem de boas-vindas ("API Garçom Eletrônico no ar!").

(As demais rotas CRUD serão implementadas nas próximas etapas do trabalho).


---

## 📅 Cronograma de Desenvolvimento

| Etapa | Atividade / Tarefa | Responsável | Status |
| :--- | :--- | :--- | :--- |
| **1. Configuração** | Configuração do Repositório e Estrutura de Pastas (MVC) | Owen | ✅ Concluído |
| **1. Configuração** | Configuração do Banco de Dados (Sequelize + SQLite) | Owen | ✅ Concluído |
| **1. Configuração** | Scripts de Banco (`seed.js` e `sync.js`) | Owen | ✅ Concluído |
| **1. Configuração** | Instalação de Dependências (`express`, `swagger`, `nodemon`) | Owen/Victor | ✅ Concluído |
| | | | |
| **2. Definição** | Levantamento de Requisitos (Definição da Planilha de Rotas) | Todos | ✅ Concluído |
| | | | |
| **3. Implementação** | Codificação dos Controllers e Services base | Todos | 🔄 Em Andamento |
| **3. Implementação** | CRUD Básico (Cardápio, Categorias e Mesas) | - | ⏳ A Fazer |
| **3. Implementação** | Regras de Negócio (Pedidos, Cozinha e Fechamento de Conta) | - | ⏳ A Fazer |
| | | | |
| **4. Qualidade** | Substituir `console.error` por Respostas HTTP Padronizadas | - | ⏳ A Fazer |
| **4. Qualidade** | Tratamento de 404 (IDs não encontrados) | - | ⏳ A Fazer |
| **4. Qualidade** | Tratamento de 400 (Dados incompletos no Body) | - | ⏳ A Fazer |
| | | | |
| **5. Documentação** | Adicionar anotações `@swagger` em todas as rotas | - | ⏳ A Fazer |
| **5. Documentação** | Atualização final do README.md | - | ⏳ A Fazer |
| | | | |
| **6. Teste Final** | Teste de Fluxo Completo (Pedido -> Cozinha -> Pagamento) | Todos | ⏳ A Fazer |
| **6. Teste Final** | Testes de Exceção (Enviar dados errados propositalmente) | - | ⏳ A Fazer |

---

## 📌 Status das Rotas da API

### 1. Pedidos (Core)
| Método | Rota | Lógica / Descrição | Resp. | Status |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/pedidos` | Cria pedido inicial (vincula Mesa/Cliente) | Owen | ✅ OK |
| GET | `/pedidos` | Lista pedidos (filtros: status, data, mesa) | Owen | ✅ OK |
| PUT | `/pedidos/:id` | Atualiza dados gerais do pedido | Victor | ✅ OK |
| DELETE | `/pedidos/:id` | Cancela pedido (apenas se não enviado à cozinha) | Victor | ✅ OK |
| POST | `/pedidos/:id/enviar-cozinha` | Muda status para "Enviado" e notifica cozinha | Victor | ✅ OK |

### 2. Itens & Adicionais
| Método | Rota | Lógica / Descrição | Status |
| :--- | :--- | :--- | :--- |
| POST | `/pedidos/:id/itens` | Adiciona um item do cardápio ao pedido | ⏳ A Fazer |
| POST | `/pedidos/:id/adicionais` | Adiciona item extra (ex: +bacon) a um item | ⏳ A Fazer |
| PUT | `/pedidos/:id/adicionais/:addId` | Altera qtd ou tipo do adicional | ⏳ A Fazer |
| DELETE | `/pedidos/:id/adicionais/:addId` | Remove o adicional do pedido | ⏳ A Fazer |

### 3. Cardápio (Backoffice)
| Método | Rota | Lógica / Descrição | Status |
| :--- | :--- | :--- | :--- |
| POST | `/itens-cardapio` | Cadastra novo prato/bebida | ⏳ A Fazer |
| PUT | `/itens-cardapio/:id` | Atualiza nome, preço ou descrição | ⏳ A Fazer |
| GET | `/itens-cardapio` | Lista tudo (pode filtrar por categoria) | ⏳ A Fazer |
| GET | `/itens-cardapio/disponiveis` | Lista apenas itens com estoque > 0 | ⏳ A Fazer |

### 4. Cozinha (KDS)
| Método | Rota | Lógica / Descrição | Resp. | Status |
| :----- | :--- | :---------------- | :--- | :----- |
| GET    | /cozinha/pedidos/pendentes | Lista fila de produção (novos e em espera) | Solenir | ✅ OK |
| PATCH  | /cozinha/pedidos/:id/iniciar | Marca status como "Em Preparação" | Solenir | ✅ OK |
| PATCH  | /cozinha/pedidos/:id/pronto  | Avisa garçom que está pronto para entrega | Solenir | ✅ OK |
| PATCH  | /cozinha/pedidos/:id/entregar| Finaliza o ciclo do pedido (Entregue) | Solenir | ✅ OK |

### 5. Mesa & Conta
| Método | Rota | Lógica / Descrição | Resp. | Status |
| :----- | :--- | :---------------- | :--- | :----- |
| GET | `/contas/:mesaId/resumo` | Consulta parcial (pré-conta) | Renato | ✅ OK |
| POST | `/contas/:id/dividir` | Simula divisão da conta entre X pessoas | Renato | ✅ OK |
| POST | `/contas/:id/fechamento` | Encerra a mesa e envia ordem para o Caixa | Renato | ✅ OK |
| POST | `/contas/:id/desconto` | Aplica desconto (valor fixo ou %) | Renato | ✅ OK |

### 6. Caixa & Pagamento
| Método | Rota | Lógica / Descrição | Resp. | Status |
| :----- | :--- | :---------------- | :--- | :----- |
| GET | `/caixa/contas/abertas` | Lista contas que pediram fechamento | Renato | ✅ OK |
| POST | `/caixa/pagamentos` | Processa o pagamento efetivo | Renato | ✅ OK |
| CRUD | `/formas-pagamento` | Gerenciar tipos (Pix, Crédito, VR, etc) | Renato | ⏳ EM ANDAMENTO  |

### 7. Relatórios (BI)
| Método | Rota | Lógica / Descrição | Status |
| :--- | :--- | :--- | :--- |
| GET | `/relatorios/itens-mais-pedidos` | Estatísticas de popularidade (Ranking) | ⏳ A Fazer |
| GET | `/relatorios/vendas-mensais` | Consolidado financeiro por mês | ⏳ A Fazer |
| GET | `/relatorios/vendas-diarias` | Fluxo de caixa do dia | ⏳ A Fazer |
| GET | `/relatorios/por-forma-pagamento` | Total por Pix vs Crédito vs Dinheiro | ⏳ A Fazer |