package com.idaltchion.ifxmoney.api.repository.lancamento;

import java.util.List;

import com.idaltchion.ifxmoney.api.model.Lancamento;
import com.idaltchion.ifxmoney.api.repository.filter.LancamentoFilter;

/*
 * Interface criada com o proposito de criar metodos especifico para o Lancamento, ja que no Repository "nao e possivel"
 */
public interface LancamentoRepositoryQuery {

	public List<Lancamento> filtrar(LancamentoFilter lancamentoFilter);
	
}
