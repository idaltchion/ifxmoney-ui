package br.com.idaltchion.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import br.com.idaltchion.jdbc.ConnectionFactory;
import br.com.idaltchion.model.Contato;

public class ContatoDAO {

	private Connection conn;
	
	public ContatoDAO() {
		this.conn = new ConnectionFactory().getConnection();
	}
	
	public void adicionar(Contato contato) {
		String sql = "INSERT INTO contatos " +
						"(nome, email, endereco, dataNascimento) " +
						"VALUES (?, ?, ?, ?)";
		
		try { 
			
			//setando valores
			PreparedStatement stmt = conn.prepareStatement(sql);
			stmt.setString(1, contato.getNome());
			stmt.setString(2, contato.getEmail());
			stmt.setString(3, contato.getEndereco());
			stmt.setDate(4, new Date(contato.getDataNascimento().getTimeInMillis()));
			
			//execucao do insert
			stmt.execute();
			
			//fechando o statement
			stmt.close();
		} 
		catch(SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	public List<Contato> listar() {
		String sql = "SELECT * FROM contatos";
		
		try {
			List<Contato> listContatos = new ArrayList<Contato>();
			PreparedStatement stmt = conn.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				//criando um novo contato
				Contato contato = new Contato();
				
				//recuperando do banco de dados informacoes do contato
				contato.setId(rs.getLong("id"));
				contato.setNome(rs.getString("nome"));
				contato.setEmail(rs.getString("email"));
				contato.setEndereco(rs.getString("endereco"));
				
				//montando a data utilizando o Calendar
				Calendar data = Calendar.getInstance();
				data.setTime(rs.getDate("dataNascimento"));
				contato.setDataNascimento(data);
				
				//add na lista o contato recuperado
				listContatos.add(contato);
			}
			rs.close();
			stmt.close();
			
			return listContatos;
		} catch(SQLException e) {
			throw new ExceptionDAO(e) ;
		}		
	}
	
	public Contato pesquisar(Long id) {
		
		String sql = "SELECT * FROM contatos where id = " + id;
		
		try {
			Contato contato = null;
			PreparedStatement stmt = conn.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				contato = new Contato();
				contato.setId(rs.getLong("id"));
				contato.setNome(rs.getString("nome"));
				contato.setEmail(rs.getString("email"));
				contato.setEndereco(rs.getString("endereco"));
				Calendar data = Calendar.getInstance();
				data.setTime(rs.getDate("dataNascimento"));
				contato.setDataNascimento(data);				
			}
			stmt.close();
			rs.close();
			return contato;
		} catch(SQLException e) {
			throw new ExceptionDAO(e);
		}
	}
	
	public void remover(Contato contato) {
		String sql = "DELETE FROM contatos WHERE id = ?";
		try {
			PreparedStatement stmt = conn.prepareStatement(sql);
			stmt.setLong(1, contato.getId());
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {
			throw new ExceptionDAO(e);
		}
		
	}
	
	public void alterar(Contato contato) {
		String sql = "UPDATE contatos SET nome = ?, email = ?, endereco = ?, dataNascimento = ? where id = ?";
		try {
			PreparedStatement stmt = conn.prepareStatement(sql);
			stmt.setString(1, contato.getNome());
			stmt.setString(2, contato.getEmail());
			stmt.setString(3, contato.getEndereco());
			stmt.setDate(4, new Date(contato.getDataNascimento().getTimeInMillis()));
			stmt.setLong(5, contato.getId());
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {
			throw new ExceptionDAO(e);
		}
		
	}
}
