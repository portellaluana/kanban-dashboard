
<strong>Projeto de Quadro Kanban em React com TypeScript</strong>

<strong>OBJETIVO</strong>
Desenvolver um sistema de quadro Kanban utilizando React com TypeScript. O sistema deverá
permitir aos usuários realizar o cadastro, fazer login, e gerenciar suas tarefas em três colunas: "A
fazer", "Em progresso" e "Pronto". O projeto visa fornecer uma experiência interativa e intuitiva
para o gerenciamento de tarefas.

Requisitos Funcionais

Cadastro e Login
Os usuários devem ter a capacidade de se cadastrar no sistema, fornecendo informações
como nome, e-mail (usuário) e senha.

Após o cadastro, os usuários devem poder fazer login no sistema utilizando suas
credenciais.

A autenticação deve ser gerenciada com persistência em localStorage.

Quadro Kanban
O quadro deve consistir em três colunas principais: "A fazer", "Em progresso" e "Pronto".
Os usuários devem poder criar, editar e excluir tarefas em cada uma das colunas.
As tarefas devem ter, no mínimo, um título, uma descrição e um estado (coluna em que
estão).

Movimentação de Tarefas
As tarefas devem ser movimentadas entre as colunas, refletindo seu estado atual.
Os usuários devem ter a capacidade de arrastar e soltar as tarefas entre as colunas, em
alternativa, pode ser feito um botão para movimentar o card entre as colunas. Não é uma
má ideia fazer as duas alternativas.

Estilo e Layout
O layout do quadro Kanban deve ser intuitivo e responsivo.
Utilize estilos apropriados para destacar visualmente as diferentes colunas, tarefas e
estados.Requisitos Técnicos

React e TypeScript
O projeto deve ser implementado utilizando React e TypeScript.
Utilize componentes funcionais e, se necessário, componentes de classe.
Utilize estilização css em módulo ou com interpretadores (Less, Sass) ou CSS-in-JS
(Styled Components, JSS)

Persistência de Dados
Utilize localStorage para persistir as informações relacionadas aos usuários e suas
tarefas.

Controle de Estado
Utilize o estado do React para gerenciar as informações do quadro Kanban e do usuário
logado.

Interatividade
Garanta uma experiência interativa ao permitir ações como arrastar e soltar tarefas.

Validações
Implemente validações adequadas nos formulários, garantindo a integridade dos dados.
