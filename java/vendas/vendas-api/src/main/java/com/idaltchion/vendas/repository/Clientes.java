package com.idaltchion.vendas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.idaltchion.vendas.model.Cliente;

public interface Clientes extends JpaRepository<Cliente, Long > {

}
