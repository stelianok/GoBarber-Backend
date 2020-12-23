# Recuperação da senha

**Requisitos funcionais**

- O usuário deve poder recuperar sua senha informando o seu e-mail.
- O usuário deve receber um e-mail com instruções de recuperação de senha.
- O usuário deve poder resetar sua senha.

**Requisitos não funcionais**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento.
- Utilizar amazon SES para envios em produção.
- O envio de e-mails deve acontecer em segundo plano (background job).
**Regras de negócio**

- O link enviado por email para resetar senha deve expirar em 2 horas.
- O usuário precisa confirmar a nova senha ao reseta-la.
# Atualização do perfil

**Requisitos funcionais**

- O usuário deve poder atualizar seu nome, email e senha.
**Regras de negócio**

- O usuário não pode alterar seu email para um email já utilizado.
- Para atualizar sua senha, o usuário deve informar a senha antiga.
- Para atualizar sua senha, o usuário precisa confirmar a nova senha.
# Painel do prestador

**Requisitos funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico.
- O prestador deve receber uma notificação sempre que houver um novo agendamento.
- O prestador deve poder visualizar as notificações não lidas.

**Requisitos não funcionais**

- Os agendamentos do prestaddor no dia devem ser armazenadas em cache.
- As notificações do prestador devem ser armazenadas no MongoDB.

**Regras de negócio**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlá-la.
# Agendamento de serviços

**Requisitos funcionais**

- O usuário deve poder listar todos os prestadores de serviço cadastrados.
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador.
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador.
- O usuário deve poder realizar um agendamento com um prestador.
**Requisitos não funcionais**

- A listagem de prestadores deve ser armazenada em cache.
- As notificações do prestador devem ser armazenadas no MongoDB.
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io.

**Regras de negócio**

- Cada agendamento deeve durar 1 hora exatamente.
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h).
- O usuário não pode agendar em um horário que já passou.
- O usuário não pode agendar serviços consigo mesmo.
