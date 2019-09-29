package br.com.idaltchion.tests.contato;

import java.text.SimpleDateFormat;

import br.com.idaltchion.dao.ContatoDAO;
import br.com.idaltchion.model.Contato;

public class PesquisarContatoTest {

	public static void main(String[] args) {
		ContatoDAO contatoDAO = new ContatoDAO();
		Long id = (long) 1;
		Contato contato = contatoDAO.pesquisar(id);
		if ( !(contato == null) ) {
			System.out.println("Nome: " + contato.getNome());
			System.out.println("Email: " + contato.getEmail());
			System.out.println("Endereco: " + contato.getEndereco());
			SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
			System.out.println("Data Nascimento: " + df.format(contato.getDataNascimento().getTime()));			
		} else { 
			System.out.println("Contato nao encontrado");
		}
	}

}
