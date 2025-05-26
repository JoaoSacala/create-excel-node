# 📊 NodeExcel API

Uma API de teste que gera relatórios de vendas em formato Excel (.xlsx), usando **Fastify** e **ExcelJS**.

---

## 🚀 Tecnologias

- [Node.js](https://nodejs.org)
- [Fastify](https://fastify.dev/)
- [ExcelJS](https://github.com/exceljs/exceljs)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)

---

## 📦 Instalação local (sem Docker)

```bash
pnpm install
pnpm dev
```
---
## 🐳 Instalação com Docker
```bash
docker compose up --build
```
## 🧪 Rotas disponíveis
GET /
Retorna um simples JSON de teste:
{ "hello": "Santos mau ai" }

GET /relatorio-vendas
Gera e baixa um arquivo .xlsx com um relatório de vendas.
O arquivo é protegido contra edição (somente leitura visual).

📁 Exemplo de nome de arquivo: relatorio-vendas.xlsx

🔒 Proteção do Excel
A planilha gerada é protegida com senha: leituraSomente.
O usuário poderá visualizar e selecionar as células, mas não poderá editá-las sem remover a proteção.

📁 Estrutura básica
<div>
  <p>├── Dockerfile</p>
  <p>├── docker-compose.yml</p>
  <p>├── package.json</p>
  <p>├── pnpm-lock.yaml</p>
  <p>├── server.ts</p>
</div>
