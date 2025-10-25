
# MentorPoints API

API REST para cadastro de ações, cupons e sorteios de prêmios para alunos, com autenticação JWT, controle de papéis (admin/aluno) e documentação Swagger.

## Endpoints principais

### Autenticação
- `POST /users/register` — Cadastro de usuário (aluno ou admin)
   - Exemplo aluno:
      ```json
      {
         "name": "João",
         "email": "joao@email.com",
         "password": "123456",
         "classId": "A1",
         "isAdmin": false
      }
      ```
   - Exemplo admin:
      ```json
      {
         "name": "Admin",
         "email": "admin@email.com",
         "password": "admin123",
         "isAdmin": true
      }
      ```
- `POST /users/login` — Login de usuário

### Prêmios
- `GET /prizes` — Listar prêmios (autenticado)
- `POST /prizes` — Criar prêmio (admin)

### Desafios
- `GET /challenges/{classId}` — Listar desafios por turma
- `POST /challenges` — Criar desafio (admin)
- `PUT /challenges/{id}` — Atualizar desafio (admin)
- `DELETE /challenges/{id}` — Remover desafio (admin)
- `POST /challenges/complete` — Registrar conclusão de desafio (admin)
   - Exemplo:
      ```json
      {
         "userId": 2,
         "challengeId": 1,
         "teamId": 12 // opcional, será preenchido automaticamente se o usuário tiver teamId
      }
      ```

### Cupons
- `GET /coupons/{userId}` — Listar cupons de um usuário
- `DELETE /coupons/{id}` — Remover cupom de um único usuário

### Admin
- `GET /admin/students` — Listar alunos (apenas admin)

## Observações importantes
- O campo `teamId` agora é corretamente preenchido ao registrar conclusão de desafio, se existir para o usuário.
- Não existe mais endpoint para adicionar pontos extras para equipe.
- A remoção de cupons é feita apenas por id, não mais por equipe.
- Todos os endpoints protegidos exigem autenticação JWT.

## Documentação Swagger
Acesse a documentação interativa em: `http://localhost:3000/api-docs`

## Como rodar
1. Instale as dependências:
    ```bash
    npm install
    ```
2. Inicie a API:
    ```bash
    npm start
    ```

---

Atualizado em 25/10/2025.
