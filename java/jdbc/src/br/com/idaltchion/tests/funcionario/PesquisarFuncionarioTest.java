package br.com.idaltchion.tests.funcionario;

import br.com.idaltchion.dao.FuncionarioDAO;
import br.com.idaltchion.model.Funcionario;

public class PesquisarFuncionarioTest {

	public static void main(String[] args) {
		FuncionarioDAO funcionarioDAO = new FuncionarioDAO();
		Long id = (long) 5;
		Funcionario funcionario = funcionarioDAO.pesquisar(id);
		if( !(funcionario == null) ) {
			String nome = funcionario.getNome();
			String usuario = funcionario.getUsuario();
			String senha = funcionario.getSenha();
			System.out.println("Nome: " + nome);
			System.out.println("Usuario: " + usuario);
			System.out.println("Senha: " + senha);
		} else {
			System.out.println("Funcionario nao encontrado.");
		}
	}

}
