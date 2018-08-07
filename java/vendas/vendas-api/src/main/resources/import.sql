insert into cliente (id, nome) values (1, 'Art Eletronics');
insert into cliente (id, nome) values (2, 'Armazem dos Eletronicos');

insert into produto (id, nome, valor) values (1, 'Notebook', 4200.00);
insert into produto (id, nome, valor) values (2, 'Smartphone', 2500.00);
insert into produto (id, nome, valor) values (3, 'Tablet', 800.00);

insert into venda (id, cliente_id, frete, total, cadastro) values (1, 1, 15.0, 4200.00, sysdate());

insert into item (id, venda_id, produto_id, quantidade) values (1, 1, 1, 1);