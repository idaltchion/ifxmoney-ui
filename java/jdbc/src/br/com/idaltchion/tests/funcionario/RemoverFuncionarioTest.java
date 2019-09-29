package br.com.idaltchion.tests.funcionario;

import br.com.idaltchion.dao.FuncionarioDAO;
import br.com.idaltchion.model.Funcionario;

public class RemoverFuncionarioTest {

	public static void main(String[] args) {
		FuncionarioDAO funcionarioDAO = new FuncionarioDAO();
		Long id = (long) 5;
		Funcionario funcionario = funcionarioDAO.pesquisar(id);
		if ( !(funcionario == null) ) {
			String nome = funcionario.getNome();
			funcionarioDAO.remover(funcionario);
			System.out.println("Funcionario " + nome + " removido com sucesso.");
		} else {
			System.out.println("Funcionario nao encontrado.");
		}
	}

}
