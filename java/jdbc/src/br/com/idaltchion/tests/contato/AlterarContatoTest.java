package br.com.idaltchion.tests.contato;

import java.util.Calendar;

import br.com.idaltchion.dao.ContatoDAO;
import br.com.idaltchion.model.Contato;

public class AlterarContatoTest {

	public static void main(String[] args) {
		ContatoDAO contatoDAO = new ContatoDAO();
		Long id = (long) 2;
		Contato contato = contatoDAO.pesquisar(id);
		if ( !(contato == null) ) {
			contato.setNome("Nome contato dois");
			contato.setEmail("contato2@email.com");
			contato.setEndereco("endereco 2");
			Calendar dataNascimento = Calendar.getInstance();
			contato.setDataNascimento(dataNascimento);
			contatoDAO.alterar(contato);
			System.out.println("Contato atualizado com sucesso.");
		} else {
			System.out.println("Contato nao localizado.");
		}
	}

}
