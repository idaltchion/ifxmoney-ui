package br.com.idaltchion.tests.general;

import java.sql.Connection;
import java.sql.SQLException;

import br.com.idaltchion.jdbc.ConnectionFactory;

public class ConnectionTest {

	public static void main(String[] args) throws SQLException {
		Connection conn = new ConnectionFactory().getConnection();
		//Add o driver do mysql no classpath (Build Path > Add to classpath)
		System.out.println("Connection OK!");
		conn.close();
	}

}
