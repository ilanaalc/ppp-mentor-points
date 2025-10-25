1.Objetivo
1.1. Criar uma API Rest chamada MentorPoints responsável por cadastrar ações que geram cupons para alunos que serão utilizados em um sorteio para a aquisição de um prêmio especifico.

2. Contexto
2.1. A API possui as seguintes funcionalidades: cadastrar um usuário, login de usuário, listar todos os prêmios, criar um novo prêmio, criar um novo desafio, listar desafios por turma, remover um desafio, atualizar um desafio existente, registrar a conslusão de um desafio, adicionar pontos extras para uma equipe, listar cupons por usuário e remover um cupom para o usuário ou por equipe.
2.2. Para que eu possa usar as funcionalidades de criar um novo prêmio, criar um novo desafio, listar desafios por turma, remover um desafio, atualizar um desafio existente, registrar a conslusão de um desafio, adicionar pontos extras para uma equipe e remover um cupom para o usuário ou por equipe, preciso estar autenticado como administrador
2.3. Para que eu possa acompanhar o seu progresso e verificar informações relacionadas ao prêmio e cupons associados ao seu usuário, preciso estar autenticado como estudante.
2.5. Podem ocorrer de existir cupons extras por cumprir mais uma etapa do desafio, como por exemplo, apresentar para a turma e isso pode gerar para todos os integrantes do mesma equipe que será identificada pelo o lider do time. Nesse caso, o administrador pode informar o id da equipe da turma e o desafio cumprido que possui cupom extra e isso atualizar para todos alunos daquela equipe um novo cupom.
2.6. O identificador de aluno, premio, desafio e cupom devem ser sequenciais para facilitar a identificação.
2.7. O cadastro do aluno deve conter a informação da turma que ele faz parte
2.8. O admin pode remover um cupom associado a um aluno ou a uma equipe
2.9. A identificação de admin ou não pode ser um bolleano
2.10. Se o aluno não informar a turma que ele faz parte no cadastro, é apresentado erro solicitando o preenchimento obrigatório do campo


3. Regras
3.1. Não me pergunte ou me informe nada, só faça. Quero o resultado final com todo a API construida.
3.2. A documentação da API deve ser feita com Swagger, em forma de arquivo, crie esse arquivo em uma pasta de recursos. O swagger precisa descrever o modelo JSON da resposta de cada endpoint com base na forma que API for implementada. O Swagger também deve contemplar os status code de erro que serão implementados na API.
3.3. Adicione um endpoint para renderizar o Swagger.
3.4. Construa um arquivo README para descrever o projeto
3.5. Divida a API em camadas: routes, controllers, service e model
3.6. Armazene os dados da API em um banco de dados em memória
3.7. Utilize a biblioteca express para construir a API Rest
3.8. Faça com que a autenticação seja parte do Middleware, utilizando token JWT como modelo de autenticação, e implemente as regras de autenticação seguindo as informações descritas no contexto.