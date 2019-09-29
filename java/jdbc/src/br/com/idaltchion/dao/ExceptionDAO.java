package br.com.idaltchion.dao;

import java.sql.SQLException;

public class ExceptionDAO extends RuntimeException {

	public ExceptionDAO(SQLException e) {
		System.out.println("Error Code: " + e.getErrorCode() +
							" Cause: " + e.getCause() + 
							" Message: " + e.getMessage());
	}

}
