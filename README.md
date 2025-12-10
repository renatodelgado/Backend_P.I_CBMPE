# Backend — Sistema de Gestão de Ocorrências | CBMPE

API REST desenvolvida para o **Corpo de Bombeiros Militar de Pernambuco (CBMPE)**, com foco na modernização do registro, gestão, auditoria e acompanhamento de ocorrências operacionais.

> Projeto acadêmico em produção, desenvolvido para uso institucional do CBMPE.

---

## Visão Geral

O sistema é composto por **dois módulos integrados**, que compartilham o mesmo backend:

- **Painel Web Administrativo**  
  Cadastro, acompanhamento, gestão de ocorrências, usuários e geração de relatórios.

- **Aplicativo Mobile (Operadores em Campo)**  
  Registro de ocorrências com suporte a uso offline, sincronização e anexos.

---

## API em Produção

**Base URL:**
```text
https://backendpicbmpe-production-d86d.up.railway.app/
```

> Hospedagem via **Railway**. Todas as rotas devem utilizar esta base.

---

## 🏗️ Arquitetura do Backend

### Stack Tecnológico

- **Runtime:** Node.js
- **Framework:** Express.js
- **Linguagem:** TypeScript
- **Banco de Dados:** MySQL + TypeORM
- **Autenticação:** JWT
- **Deploy:** Railway
- **Uploads:** Cloudinary

### Estrutura de Pastas

```txt
src/
├── controllers/      # Camada de entrada (HTTP)
├── services/         # Regras de negócio
├── repositories/     # Acesso ao banco de dados
├── entities/         # Entidades (TypeORM)
├── routes/           # Rotas da aplicação
├── middlewares/      # Autenticação, permissões e auditoria
├── config/           # Configurações globais
├── @types/           # Tipagens customizadas
├── migrations/       # Controle de versão do banco
├── App.ts            # Configuração da API
└── Server.ts         # Inicialização do servidor
```

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js 16+
- MySQL 8+

---

### Instalação

```bash
git clone https://github.com/renatodelgado/Backend_P.I_CBMPE.git
cd Backend_P.I_CBMPE
npm install
cp .env.example .env
```

---

### Variáveis de Ambiente

Arquivo `.env`:

```env
# Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=cbmpe_db

# Autenticação
JWT_SECRET=sua_chave_secreta_muito_forte

# CORS
CORS_ORIGIN=http://localhost:3000
```

---

### Executar Localmente

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start
```

Servidor disponível em:
```text
http://localhost:3000
```

---

## Principais Endpoints

### Autenticação

```http
POST /auth/login
```

**Request:**
```json
{
  "matricula": "cbmpe0001",
  "senha": "123456"
}
```

**Response:**
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "matricula": "12345",
    "perfil": "OPERADOR",
    "unidadeOperacional": "Recife"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### Ocorrências

```http
GET    /ocorrencias
GET    /ocorrencias/:id
POST   /ocorrencias
PUT    /ocorrencias/:id
```

---

### Usuários

```http
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
```

---

### Logs de Auditoria

```http
GET /audit
GET /audit/:id
```

---

### Exemplos de Outras Rotas

```http
GET /perfis
GET /unidadesoperacionais
GET /regioes
GET /viaturas
```

---

## Autenticação e Perfis

### Uso do Token JWT

```http
Authorization: Bearer <seu_token>
```

### Perfis do Sistema

- **ADMINISTRADOR** — Acesso total
- **AUDITOR** — Acesso aos logs
- **GESTOR** — Gerenciamento de ocorrências
- **OPERADOR** — Operações em campo

---

## Banco de Dados

### Entidades Principais

| Tabela | Descrição |
|--------|------------|
| users | Usuários |
| ocorrencias | Registros de ocorrências |
| perfis | Perfis de acesso |
| log_auditoria | Histórico de ações |
| anexos | Imagens e arquivos |
| regioes | Regiões geográficas |
| unidades_operacionais | Unidades do CBMPE |
| viaturas | Viaturas cadastradas |

---

### Migrations

```bash
npm run typeorm migration:run
npm run typeorm migration:generate -- -n NomeDaMigracao
```

---

## Padrões de Desenvolvimento

- Arquitetura em camadas
- Controllers → Services → Repositories → Entities
- Tratamento de erros centralizado
- Validação via TypeORM + regras na Service

---

## Troubleshooting

- **Erro de conexão com a API:** verifique URL e CORS
- **Erro de banco:** verifique MySQL e variáveis `.env`
- **Token expirado:** refaça login
- **Erro 500:** consulte os logs no Railway

---

## Deploy (Railway)

A API está em produção no Railway. O deploy é automático ao realizar push para a branch `main`, mas, por ser uma conta free, a qualquer momento pode ficar fora do ar.

---

## Equipe Desenvolvedora

Projeto Integrador — **3º Período • Turma 43 • Faculdade Senac Pernambuco**

- João Victor Rodrigues Basante
- João Vitor Malveira da Silva
- Maria Clara de Melo
- Renato Trancoso Branco Delgado
- Thayana Anália dos Santos Lira
- Vinicius Henrique Silva Nascimento

---

## Professores

| Disciplina | Professor |
|-------------|------------|
| Coding Mobile | Prof. Geraldo Júnior (Orientador) |
| User Experience | Prof. Marcos Tenório |
| Arquitetura e Desenvolvimento Backend | Prof. Danilo Farias |
| Comunicação Empresarial | Prof. Carol Luz |
| Engenharia de Software | Prof. Sonia Gomes |
| Data Science | Prof. Welton Dionísio |

---

## Licença

Projeto desenvolvido para fins acadêmicos. Todos os direitos reservados.

---

**Última atualização:** Dezembro • 2025  
**Status:** ✅ Em produção

