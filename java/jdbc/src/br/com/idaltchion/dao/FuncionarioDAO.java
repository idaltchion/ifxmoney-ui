package br.com.idaltchion.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import br.com.idaltchion.jdbc.ConnectionFactory;
import br.com.idaltchion.model.Funcionario;

public class FuncionarioDAO {
	
	private Connection conn;
	
	public FuncionarioDAO() {
		this.conn = new ConnectionFactory().getConnection();
	}
	
	public void adicionar(Funcionario funcionario) {
		String sql = "INSERT INTO funcionarios " +
				" (nome, usuario, senha) VALUES " +
				" (?, ?, ?) ";
		try {
			PreparedStatement stmt = conn.prepareStatement(sql);
			stmt.setString(1, funcionario.getNome());
			stmt.setString(2, funcionario.getUsuario());
			stmt.setString(3, funcionario.getSenha());
			stmt.execute();
			stmt.close();
		} catch(SQLException e) {
			throw new ExceptionDAO(e);
		}
	}
	
	public List<Funcionario> listar() {
		String sql = "SELECT * FROM funcionarios";
		try {
			PreparedStatement stmt = conn.prepareStatement(sql);
			List<Funcionario> listaFuncionarios = new ArrayList<Funcionario>();
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				Funcionario funcionario = new Funcionario();
				funcionario.setId(rs.getLong("id"));
				funcionario.setNome(rs.getString("nome"));
				funcionario.setUsuario(rs.getString("usuario"));
				funcionario.setSenha(rs.getString("senha"));
				listaFuncionarios.add(funcionario);
			}
			stmt.close();
			rs.close();
			return listaFuncionarios;
		} catch(SQLException e) {
			throw new ExceptionDAO(e);
		}
	}
	
	public void remover(Funcionario funcionario) {
		String sql = "DELETE FROM funcionarios WHERE id = ?";
		try {
			PreparedStatement stmt = conn.prepareStatement(sql);
			stmt.setLong(1, funcionario.getId());
			stmt.execute();
			stmt.close();
		} catch(SQLException e) {
			throw new ExceptionDAO(e);
		}
	}
	
	public Funcionario pesquisar(Long id) {
		String sql = "SELECT * FROM funcionarios WHERE id = ?";
		try {
			Funcionario funcionario = null;
			PreparedStatement stmt = conn.prepareStatement(sql);
			stmt.setLong(1, id);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				funcionario = new Funcionario();
				funcionario.setId(rs.getLong("id"));
				funcionario.setNome(rs.getString("nome"));
				funcionario.setUsuario(rs.getString("usuario"));
				funcionario.setSenha(rs.getString("senha"));
			}
			return funcionario;
		} catch(SQLException e) {
			throw new ExceptionDAO(e);
		}
	}
	
	public void alterar(Funcionario funcionario) {
		String sql = "UPDATE funcionarios SET nome = ?, usuario = ?, senha = ? WHERE id = ?";
		
		try {
			PreparedStatement stmt = conn.prepareStatement(sql);
			stmt.setString(1, funcionario.getNome());
			stmt.setString(2, funcionario.getUsuario());
			stmt.setString(3, funcionario.getSenha());
			stmt.setLong(4, funcionario.getId());
			stmt.execute();
			stmt.close();
		} catch(SQLException e) {
			throw new ExceptionDAO(e);
		}
	}
	
}
