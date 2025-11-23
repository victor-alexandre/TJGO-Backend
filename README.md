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
- **Swagger**: Documentação interativa da API.

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
| Método | Rota | Lógica / Descrição | Status |
| :--- | :--- | :--- | :--- |
| GET | `/cozinha/pedidos/pendentes` | Lista fila de produção (novos e em espera) | ⏳ A Fazer |
| PATCH | `/cozinha/pedidos/:id/iniciar` | Marca status como "Em Preparação" | ⏳ A Fazer |
| PATCH | `/cozinha/pedidos/:id/pronto` | Avisa garçom que está pronto para entrega | ⏳ A Fazer |
| PATCH | `/cozinha/pedidos/:id/entregar` | Finaliza o ciclo do pedido (Entregue) | ⏳ A Fazer |

### 5. Mesa & Conta
| Método | Rota | Lógica / Descrição | Status |
| :--- | :--- | :--- | :--- |
| GET | `/contas/:mesaId/resumo` | Consulta parcial (pré-conta) | ⏳ A Fazer |
| POST | `/contas/:id/dividir` | Simula divisão da conta entre X pessoas | ⏳ A Fazer |
| POST | `/contas/:id/fechamento` | Encerra a mesa e envia ordem para o Caixa | ⏳ A Fazer |
| POST | `/contas/:id/desconto` | Aplica desconto (valor fixo ou %) | ⏳ A Fazer |

### 6. Caixa & Pagamento
| Método | Rota | Lógica / Descrição | Status |
| :--- | :--- | :--- | :--- |
| GET | `/caixa/contas/abertas` | Lista contas que pediram fechamento | ⏳ A Fazer |
| POST | `/caixa/pagamentos` | Processa o pagamento efetivo | ⏳ A Fazer |
| CRUD | `/formas-pagamento` | Gerenciar tipos (Pix, Crédito, VR, etc) | ⏳ A Fazer |

### 7. Relatórios (BI)
| Método | Rota | Lógica / Descrição | Status |
| :--- | :--- | :--- | :--- |
| GET | `/relatorios/itens-mais-pedidos` | Estatísticas de popularidade (Ranking) | ⏳ A Fazer |
| GET | `/relatorios/vendas-mensais` | Consolidado financeiro por mês | ⏳ A Fazer |
| GET | `/relatorios/vendas-diarias` | Fluxo de caixa do dia | ⏳ A Fazer |
| GET | `/relatorios/por-forma-pagamento` | Total por Pix vs Crédito vs Dinheiro | ⏳ A Fazer |

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