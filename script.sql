#em problemas com a conexão, tente:
--mysql -u root -p
#GRANT ALL PRIVILEGES ON *.* TO 'seu_usuario'@'%' IDENTIFIED BY 'sua_senha' WITH GRANT OPTION;
#FLUSH PRIVILEGES;
#Para habilitar um host especifico, subtitua '%' apos o @ pelo host(GRANT ALL PRIVILEGES ON *.* TO 'seu_usuario'@'Desktop_PCH001' IDENTIFIED BY 'sua_senha' WITH GRANT OPTION;)

#CREATE USER 'userdb'@'%' IDENTIFIED BY 'admin@123456';
#GRANT ALL PRIVILEGES ON *.* TO 'userdb'@'%';

create database contatos;
use contatos;

create table veiculos(
id int auto_increment primary key,
marca varchar(100),
modelo varchar(100),
cor varchar(50),
ano YEAR,
placa varchar(7),
preco_diaria DECIMAL(10,2),
disponibilidade BOOLEAN,
categoria ENUM ("premium","intermediario","basico"),
createdAt datetime,
updatedAt datetime
);

create table clientes(
id int auto_increment primary key,
nome_completo varchar(255),
email varchar(100) UNIQUE,
telefone varchar(20),
endereco varchar(255),
sexo ENUM('masculino','feminino','outro'),
data_nascimento date,
createdAt datetime,
updatedAt datetime
);

create table locacoes(
id int auto_increment primary key,
cliente_id int,
veiculo_id int,
data_inicio date,
data_fim date,
valor_total DECIMAL(10,2),
status ENUM ("ativa","concluida","cancelada"),
createdAt datetime,
updatedAt datetime,
FOREIGN KEY(cliente_id) REFERENCES clientes(id),
FOREIGN KEY(veiculo_id) REFERENCES veiculos(id)
);














select * from contatos;

insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Ana Vitória", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.br", 11, 981736245, "São Paulo", "SP", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 1, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("João Novais", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.br", 11, 981736245, "Belo Horizonte", "MG", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 2, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Pedro Lucas", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.br", 11, 981736245, "Curitiba", "PR", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 3, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("José Silva", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.br", 11, 981736245, "Porto Alegre", "RS", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 4, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Souza Bueno", "Centro Paula Souza", "Estagiário", "contato@cps.com.br", 11, 981736245, "Fortaleza", "CE", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 5, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Maria Cavalcante", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.br", 11, 981736245, "São Carlos", "SP", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 6, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Ana Liz", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.br", 11, 981736245, "Indaiatuba", "SP", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 7, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Maria Helena", "Centro Paula Souza", "Estagiária", "contato@cps.com.br", 11, 981736245, "Montes Claros", "MG", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 8, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Larissa Alves", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.br", 11, 981736245, "Pouso alegre", "MG", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 9, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Sara Gonçalves", "Centro Paula Souza", "Estagiária", "contato@cps.com.br", 11, 981736245, "Araçatuba", "SP", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 10, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Beatriz Lima", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.br", 11, 981736245, "Florianópolis", "SC", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 11, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("João Pedro", "Centro Paula Souza", "Estagiário", "contato@cps.com.br", 11, 981736245, "Balneário Camboriú", "SC", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 12, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Giovanna Cardados", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.brw", 11, 981736245, "Blumenau", "SC", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 13, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Cristian Oliveira", "Centro Paula Souza", "Estagiário", "contato@cps.com.br", 11, 981736245, "Londrina", "PR", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 14, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Antonio Gouveia", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.br", 11, 981736245, "Cotia", "SP", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 15, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Bruno de Pádua", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.br", 11, 981736245, "Rio de Janeiro", "RJ", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 16, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Maria Eduarda", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.br", 11, 981736245, "Petrolina", "PE", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 17, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Anderson Fagundes", "Centro Paula Souza", "Estagiário", "contato@cps.com.br", 11, 981736245, "Ouro Preto", "MG", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 18, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Neto Cedroni", "Centro Paula Souza", "Estagiário", "contato@cps.com.br", 11, 981736245, "Gonçalves", "MG", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 19, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Arnaldo Perez", "Centro Paula Souza", "Estagiário", "contato@cps.com.br", 11, 981736245, "Brusque", "SC", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 20, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Luísa Machado", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.br", 11, 981736245, "São João dos Patos", "MA", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 21, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Gabriele de Souza", "Centro Paula Souza", "Jovem Aprendiz", "contato@cps.com.br", 11, 981736245, "Manaus", "AM", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 22, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Amanda Correia", "Centro Paula Souza", "Estagiária", "Jcontato@cps.com.br", 11, 981736245, "João Pessoa", "PB", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 23, now(), now());
insert into contatos (nome, empresa, cargo, email, ddd, telefone, cidade, uf, msg, avatar, createdAt, updatedAt) values ("Vitor Hugo", "Centro Paula Souza", "Estagiário", "contato@cps.com.br", 11, 981736245, "Salvador", "BA", "A grandeza não consiste em receber honras, mas em merecê-las | Aristóteles.", 25, now(), now());