package br.com.idaltchion.tests.contato;

import java.util.Calendar;

import br.com.idaltchion.dao.ContatoDAO;
import br.com.idaltchion.model.Contato;

public class AdicionarContatoTest {

	public static void main(String[] args) {
		Contato contato = new Contato();
		contato.setNome("Contato dois");
		contato.setEmail("contato2@email.com");
		contato.setEndereco("endereco contato 2");
		contato.setDataNascimento(Calendar.getInstance());
		
		ContatoDAO contadoDAO = new ContatoDAO();
		contadoDAO.adicionar(contato);
		System.out.println("Contato gravado com sucesso!");
	}

}
