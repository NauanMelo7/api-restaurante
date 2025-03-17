# 🚀 API para Gerenciamento de Mesas de um Restaurante

Esta API foi criada para gerenciar mesas de um restaurante, permitindo o controle de reservas, status das mesas e pedidos. O projeto serve como aprendizado para desenvolvimento com Node.js e Express.

## 📌 Tecnologias utilizadas

- **Node.js** - Ambiente de execução JavaScript no servidor
- **Express.js** - Framework para criação de APIs
- **TypeScript** - Superset do JavaScript para tipagem estática
- **SQLite** - Banco de dados leve e integrado
- **Knex.js** - Query Builder para interação com o banco de dados

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

# api-restaurante
