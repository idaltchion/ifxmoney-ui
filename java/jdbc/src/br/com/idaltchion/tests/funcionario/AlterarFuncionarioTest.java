package br.com.idaltchion.tests.funcionario;

import br.com.idaltchion.dao.FuncionarioDAO;
import br.com.idaltchion.model.Funcionario;

public class AlterarFuncionarioTest {

	public static void main(String[] args) {
		FuncionarioDAO funcionarioDAO = new FuncionarioDAO();
		Long id = (long) 6;
		Funcionario funcionario = funcionarioDAO.pesquisar(id);
		if ( !(funcionario == null) ) {
			funcionario.setNome("Novo nome funcionario 3");
			funcionario.setUsuario("novoUsuarioFunc3");
			funcionario.setSenha("novaSenhaFunc3");
			funcionarioDAO.alterar(funcionario);
			System.out.println("Funcionario alterado com sucesso.");
			
		} else {
			System.out.println("Funcionario nao encontrado.");
		}
		
	}

}
