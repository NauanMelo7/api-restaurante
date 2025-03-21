# 🚀 API para Gerenciamento de Mesas de um Restaurante

Esta API foi criada para gerenciar mesas de um restaurante, permitindo o controle de reservas, status das mesas e pedidos. Desenvolvimento com Node.js e Express.

## 📌 Tecnologias utilizadas

- **Node.js** - Ambiente de execução JavaScript no servidor
- **Express.js** - Framework para criação de APIs
- **TypeScript** - Superset do JavaScript para tipagem estática
- **SQLite** - Banco de dados leve e integrado
- **Knex.js** - Query Builder para interação com o banco de dados
- **Zod** - Biblioteca para validação de dados

---

## 📌 Como executar o projeto

### 🔹 **1. Clone o repositório**
```bash
git clone https://github.com/NauanMelo7/api-restaurante.git
cd api-restaurante
```

### 🔹 **2. Instale as dependências**
```bash
npm install
```

### 🔹 **3. Configuração do Banco de Dados**
Execute as migrações para criar as tabelas no SQLite:
```bash
npx knex migrate:latest
```

### 🔹 **4. Inicialize o servidor**
```bash
npm run dev
```
A API estará disponível em **`http://localhost:3333`**.

---

## 📌 Endpoints da API

### 📌 **1. Gerenciamento de Mesas** (`/tables`)

#### 📌 Listar todas as mesas
**GET** `/tables`
```json
Resposta:
[
  { "id": 1, "table_number": 10 },
  { "id": 2, "table_number": 5 }
]
```

#### 📌 Criar uma nova mesa
**POST** `/tables`
```json
Corpo da requisição:
{
  "table_number": 12
}
```

#### 📌 Deletar uma mesa
**DELETE** `/tables/:id`
```json
Resposta:
{}
```

---

### 📌 **2. Gerenciamento de Sessões de Mesas** (`/tables_sessions`)

#### 📌 Criar uma nova sessão de mesa
**POST** `/tables_sessions`
```json
Corpo da requisição:
{
  "table_id": 1
}
```

#### 📌 Listar todas as sessões
**GET** `/tables_sessions`
```json
Resposta:
[
  { "id": 1, "table_id": 1, "opened_at": "2024-03-19T12:00:00Z", "closed_at": null }
]
```

#### 📌 Fechar uma sessão de mesa
**PUT** `/tables_sessions/:id`
```json
Resposta:
{}
```

---

### 📌 **3. Gerenciamento de Produtos** (`/products`)

#### 📌 Listar produtos
**GET** `/products`
```json
Resposta:
[
  { "id": 1, "name": "Pizza Margherita", "price": 20.0 },
  { "id": 2, "name": "Coca-Cola", "price": 5.0 }
]
```

#### 📌 Criar um produto
**POST** `/products`
```json
Corpo da requisição:
{
  "name": "Pizza Quatro Queijos",
  "price": 25.0
}
```

#### 📌 Atualizar um produto
**PUT** `/products/:id`
```json
Corpo da requisição:
{
  "name": "Pizza Pepperoni",
  "price": 30.0
}
```

#### 📌 Deletar um produto
**DELETE** `/products/:id`
```json
Resposta:
{}
```

---

### 📌 **4. Gerenciamento de Pedidos** (`/orders`)

#### 📌 Criar pedido
**POST** `/orders`
```json
Corpo da requisição:
{
  "table_session_id": 1,
  "product_id": 2,
  "quantity": 3
}
```
**Resposta:**
```json
Status: 201 Created
{}
```

#### 📌 Listar pedidos por sessão
**GET** `/orders/:table_session_id`
```json
Resposta:
[
  {
    "id": 1,
    "table_session_id": 1,
    "product_id": 2,
    "name": "Coca-Cola",
    "price": 5.0,
    "quantity": 3,
    "total": 15.0,
    "created_at": "2024-03-21T12:00:00Z",
    "update_at": null
  }
]
```

#### 📌 Mostrar totais da sessão
**GET** `/orders/total/:table_session_id`
```json
Resposta:
{
  "Quantity": 3,
  "Total": 15.0
}
```

---

## 📌 Tratamento de Erros

A API usa **Zod** para validação de dados e um middleware de erros personalizado para padronizar respostas de erro.

Exemplo de resposta de erro:
```json
{
  "error": "Invalid table ID format"
}
```

Caso ocorra um erro inesperado, a API retornará um erro 500:
```json
{
  "error": "Internal Server Error"
}
```

---

## 📌 Conclusão

Esta API fornece funcionalidades essenciais para o gerenciamento de um restaurante, incluindo o controle de mesas, sessões e produtos. Ela pode ser facilmente expandida para incluir pagamentos e integração com frontend. 🚀

No repositório existe um arquivo chamado **`request_insomnia`** com todas as requisições prontas para testes na ferramenta [Insomnia](https://insomnia.rest).

