package br.com.idaltchion.tests.contato;

import java.text.SimpleDateFormat;
import java.util.List;

import br.com.idaltchion.dao.ContatoDAO;
import br.com.idaltchion.model.Contato;

public class ListarContatosTest {

	public static void main(String[] args) {
		ContatoDAO contatoDAO = new ContatoDAO();
		List<Contato> contatos = contatoDAO.listar();
		for(Contato contato : contatos) {
			System.out.println("Nome: " + contato.getNome());
			System.out.println("Email: " + contato.getEmail());
			System.out.println("Endereco: " + contato.getEndereco());
			SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
			System.out.println("Data Nascimento: " + df.format(contato.getDataNascimento().getTime()));
			System.out.println();
		}
	}

}
