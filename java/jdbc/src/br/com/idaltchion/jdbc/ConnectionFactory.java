package br.com.idaltchion.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {

	public Connection getConnection() {
		try {
			return DriverManager.getConnection("jdbc:mysql://localhost/jdbc_test", "root", "root");
		}
		catch(SQLException e) {
			throw new RuntimeException(e);
		}
		
	}
}
