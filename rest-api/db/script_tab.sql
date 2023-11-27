-- Criação da tabela de usuários
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

-- Criação da tabela de entradas
CREATE TABLE blog_entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(255) NULL,
  url VARCHAR(255) NULL,
  user_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Criação da tabela de permissões
CREATE TABLE permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    permission ENUM('edit', 'delete') NOT NULL
);
-- inserir dados usuarios
INSERT INTO users (username, email, password, is_admin)
VALUES (
    {'Ana Claudia', 'testeana@gmail.com', '123456', true},
);
INSERT INTO users (username, email, password, is_admin)
VALUES
    ('Marcos Paulo', 'testeMaros@gmail.com', '123456', false),
    ('Lukas da Silva', 'testeLukas@gmail.com', '123456', false),
    ('Valquiria Ramesse', 'testeVal@gmail.com', '123456', false),

INSERT INTO blog_entries (title, content,image,url, user_id )
VALUES
    ('Dream', 'My dream is very good','','', 1),
    ('Today', 'Today Jojo is happy','','', 2),
    ('Holidays', 'I am holidays Monday','','', 3),



ALTER TABLE `blog_entries` ADD `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER `user_id`


INSERT INTO blog_entries (title, content, user_id)
VALUES ('{title}', '{content}', {user_id});

-- Query para exibir as três últimas entradas de todos os usuários, ordenadas por data, com paginação
SELECT entradas.titulo, entradas.conteudo, users.username AS usuario
FROM entradas
JOIN users ON entradas.usuario_id = users.id
ORDER BY entradas.data_publicacao DESC
LIMIT 3
OFFSET 0;



-- Query para verificar se um usuário tem permissão para editar ou excluir uma entrada
SELECT COUNT(*) AS tem_permissao
FROM permissoes
WHERE usuario_id = <id_usuario> AND permissao = 'editar';

-- Query para editar uma entrada
UPDATE entradas
SET titulo = <novo_titulo>, conteudo = <novo_conteudo>
WHERE id = <id_entrada>;

-- Query para excluir uma entrada
DELETE FROM entradas
WHERE id = <id_entrada>;
