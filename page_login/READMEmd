# CriticalRoll - Login

Repositório para criação do Software Critical Roll.

<h3 style="text-align: justify;">Status atual do sistema</h3>
Sistema parcialmente completo.

* __Complicação atual:__ fazer comunicação com SQL.

# Passos para Implementação
<h3>Passo 01: Criar Tabéla SQL</h3>
Abra o phpMyAdmin ou qualquer outro cliente SQL e crie um banco de dados para armazenar os logins e senhas. No projeto atual o banco de dados foi nomeado como "testelogin". Em seguida, no arquivo createTables.sql (dentro da pasta db), cole o seguinte código SQL para criar a tabela de usuários:

<!-- /wp:tadv/classic-paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
</code></pre>
<!-- /wp:code -->

<!-- wp:tadv/classic-paragraph -->

<h3>Passo 02: Configure o Node.js</h3>
Abra o terminal (prompt de comando) e vá até a pasta onde se localiza o projeto:

<!-- /wp:tadv/classic-paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>cd C:\projeto\...
</code></pre>
<!-- /wp:code -->

<!-- wp:tadv/classic-paragraph -->

Depois, inicialize o Node.js:
<!-- /wp:tadv/classic-paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>npm init -y
</code></pre>
<!-- /wp:code -->


<!-- wp:tadv/classic-paragraph -->


<h3>Passo 03: Modifique app.js</h3>
Abra o arquivo app.js com algum editor, encontre o trecho abaixo (*linhas 17-22*) e a modifique conforme necessário para a implementação:

<!-- /wp:tadv/classic-paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>const db = mysql.createConnection({
    host: '127.0.0.1',       // Host do banco de dados
    user: 'root',            // Usuário do MySQL
    password: 'Gamer123',    // Senha do MySQL (a mesma do config.inc.php)
    database: 'testelogin'   // Nome do banco de dados
});

</code></pre>
<!-- /wp:code -->

<!-- wp:tadv/classic-paragraph -->


<h3>Passo 04: Execute o sistema</h3>
Com tudo pronto, para executar o sistema execute o código abaixo no prompt:

<!-- /wp:tadv/classic-paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>node app.js
</code></pre>
<!-- /wp:code -->

<!-- wp:tadv/classic-paragraph -->

