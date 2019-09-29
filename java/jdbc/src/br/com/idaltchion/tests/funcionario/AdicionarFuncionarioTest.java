package br.com.idaltchion.tests.funcionario;

import br.com.idaltchion.dao.FuncionarioDAO;
import br.com.idaltchion.model.Funcionario;

public class AdicionarFuncionarioTest {

	public static void main(String[] args) {
		FuncionarioDAO funcionarioDAO = new FuncionarioDAO();
		Funcionario funcionario = new Funcionario();
		
		funcionario.setNome("Funcionario tres");
		funcionario.setUsuario("funcionario3");
		funcionario.setSenha("SenhaFunc3");
		
		funcionarioDAO.adicionar(funcionario);
		
		System.out.println("Funcionario adicionado com sucesso!");
	}

}
