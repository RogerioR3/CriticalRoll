# CriticalRoll - Login

Repositório para criação do Software Critical Roll.

<h3 style="text-align: justify;">Status atual do sistema</h3>
Sistema parcialmente completo.
* Complicação atual: fazer comunicação com SQL.

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
