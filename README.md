
# MentorPoints API

🎯 **Sistema de gamificação educacional** que permite administradores criarem desafios para alunos, gerando cupons automaticamente quando concluídos. API REST com autenticação JWT e controle de permissões.

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação e Execução
```bash
# 1. Clone o repositório
git clone https://github.com/ilanaalc/ppp-mentor-points.git
cd ppp-mentor-points

# 2. Instale as dependências
npm install

# 3. Execute a API
npm start
# ou para desenvolvimento (com auto-reload)
npm run dev
```

### Acesso
- **API**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api-docs

## 📁 Estrutura do Projeto

```
├── src/
│   ├── controllers/     # Controladores das rotas
│   ├── middleware/      # Middlewares de autenticação
│   ├── models/         # Modelos de dados (banco em memória)
│   ├── routes/         # Definição das rotas
│   ├── services/       # Lógica de negócio
│   └── index.js        # Arquivo principal da aplicação
├── resources/
│   └── swagger.json    # Documentação da API
├── package.json
└── README.md
```

## 🔐 Autenticação

A API utiliza **JWT** para autenticação. Após o login, inclua o token no header:
```
Authorization: Bearer <seu_token_jwt>
```

**Tipos de usuário:**
- **Admin**: Pode gerenciar desafios, registrar conclusões e criar prêmios
- **Aluno**: Pode visualizar desafios e cupons de sua turma

## 📋 Endpoints da API

### 🔑 Autenticação
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/users/register` | Cadastrar usuário | ❌ |
| POST | `/users/login` | Login de usuário | ❌ |

**Cadastro de Aluno:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com", 
  "password": "123456",
  "classId": "A1",
  "isAdmin": false
}
```

**Cadastro de Admin:**
```json
{
  "name": "Admin",
  "email": "admin@email.com",
  "password": "admin123", 
  "isAdmin": true
}
```

### 🎯 Desafios
| Método | Endpoint | Descrição | Permissão |
|--------|----------|-----------|-----------|
| GET | `/challenges/{classId}` | Listar desafios por turma | Qualquer usuário |
| POST | `/challenges` | Criar desafio | Admin |
| PUT | `/challenges/{id}` | Atualizar desafio | Admin |
| DELETE | `/challenges/{id}` | Remover desafio | Admin |
| POST | `/challenges/complete` | Registrar conclusão | Admin |

**Criar Desafio:**
```json
{
  "title": "Exercício de Matemática",
  "description": "Resolver 10 problemas de álgebra",
  "classId": "A1",
  "extraCoupon": false
}
```

**Registrar Conclusão:**
```json
{
  "userId": 2,
  "challengeId": 1,
  "challengeTitle": "Exercício de Matemática",
  "teamId": 12  // opcional
}
```

### 🎫 Cupons
| Método | Endpoint | Descrição | Permissão |
|--------|----------|-----------|-----------|
| GET | `/coupons/{userId}` | Cupons de um usuário | Qualquer usuário |
| GET | `/coupons/class/{classId}` | Cupons de uma turma | Qualquer usuário |
| DELETE | `/coupons/{id}` | Remover cupom | Admin |

### 🏆 Prêmios
| Método | Endpoint | Descrição | Permissão |
|--------|----------|-----------|-----------|
| GET | `/prizes` | Listar prêmios | Qualquer usuário |
| POST | `/prizes` | Criar prêmio | Admin |

**Criar Prêmio:**
```json
{
  "name": "Smartphone",
  "description": "iPhone 15 Pro Max 256GB"
}
```

### 👥 Administração
| Método | Endpoint | Descrição | Permissão |
|--------|----------|-----------|-----------|
| GET | `/admin/students` | Listar todos os alunos | Admin |
| GET | `/admin/students/class/{classId}` | Alunos por turma | Admin |

## ⚡ Funcionalidades Principais

### 🎮 Fluxo do Sistema
1. **Admin cria desafios** para turmas específicas
2. **Admin registra conclusão** quando aluno completa desafio
3. **Sistema gera cupom automaticamente** para o aluno
4. **Alunos visualizam seus cupons** e prêmios disponíveis

### 🔒 Segurança
- Senhas criptografadas com bcrypt
- Tokens JWT com expiração de 24h
- Controle rigoroso de permissões por tipo de usuário
- Validação de dados em todas as operações

### 📊 Banco de Dados
- **Armazenamento em memória** (dados resetam ao reiniciar)
- Ideal para desenvolvimento e testes
- IDs sequenciais auto-incrementais

## 📚 Documentação Detalhada

- **Swagger UI**: http://localhost:3000/api-docs (interface interativa)
- **Regras de Negócio**: Consulte `REGRAS_DE_NEGOCIO.md`

## 🛠️ Tecnologias

- **Node.js** + **Express.js**
- **JWT** para autenticação
- **bcryptjs** para criptografia
- **Swagger UI** para documentação
- **Banco em memória** (sem dependências externas)

## ⚠️ Observações Importantes

- Email deve ser único para cada usuário
- Alunos devem ter `classId`, administradores não
- Cupons são gerados APENAS pela conclusão de desafios
- `teamId` é preenchido automaticamente se o usuário possuir
- Todas as operações respeitam o filtro por turma

---

*Atualizado em: 29 de outubro de 2025*
