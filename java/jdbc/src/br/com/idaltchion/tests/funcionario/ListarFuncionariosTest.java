package br.com.idaltchion.tests.funcionario;

import java.util.List;

import br.com.idaltchion.dao.FuncionarioDAO;
import br.com.idaltchion.model.Funcionario;

public class ListarFuncionariosTest {

	public static void main(String[] args) {
		FuncionarioDAO funcionarioDAO = new FuncionarioDAO();
		List<Funcionario> listaFuncionarios = funcionarioDAO.listar();
		for (Funcionario funcionario : listaFuncionarios) {
			Long id = funcionario.getId();
			String nome = funcionario.getNome();
			String usuario = funcionario.getUsuario();
			String senha = funcionario.getSenha();
			System.out.println("ID: " + id);
			System.out.println("Nome: " + nome);
			System.out.println("Usuario: " + usuario); 
			System.out.println("Senha: " + senha);
			System.out.println();			
		}
	}

}
