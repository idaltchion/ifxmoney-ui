package br.com.idaltchion.tests.contato;

import br.com.idaltchion.dao.ContatoDAO;
import br.com.idaltchion.model.Contato;

public class RemoverContatoTest {

	public static void main(String[] args) {
		ContatoDAO contatoDAO = new ContatoDAO();
		Long id = (long) 1;
		Contato contato = contatoDAO.pesquisar(id);
		if ( !(contato == null) ) {
			String nome = contato.getNome();
			contatoDAO.remover(contato);
			System.out.println("Contato " + nome + " removido com sucesso.");
		}
		else {
			System.out.println("Contato nao localizado.");
		}

	}

}
