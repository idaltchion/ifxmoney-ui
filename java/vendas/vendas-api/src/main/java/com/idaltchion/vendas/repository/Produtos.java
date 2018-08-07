package com.idaltchion.vendas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.idaltchion.vendas.model.Produto;

public interface Produtos extends JpaRepository<Produto, Long> {

}
