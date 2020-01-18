package com.idaltchion.ifxmoney.api.resource;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/*
 * Estudar sobre refreshToken, accessToken e Cookie
 * - refreshToken: fica no cookie e no protocolo https (mais seguro), tempo mair
 * - accessToken: fica no client (javascript) e pode ser mais facilmente burlado, por isso o tempo eh menor 
 */

@RestController
@RequestMapping("/tokens")
public class TokenResource {

	/*
	 * - O acesso a esse recurso vai ficar da seguinte maneira: http://<server>:<porta>/tokens/revoke
	 * - O "logout" vai ser simplesmente deixa o refreshToken de dentro do cookie nulo e com tempo zerado
	 */
	@DeleteMapping("/revoke")
	public void revoke(HttpServletRequest req, HttpServletResponse resp) {
		Cookie cookie = new Cookie("refreshToken", null);
		cookie.setSecure(false); //TODO: em producao setar para true
		cookie.setHttpOnly(true); 
		cookie.setPath(req.getContextPath() + "/oauth/token");
		cookie.setMaxAge(0);
		
		resp.addCookie(cookie);
		resp.setStatus(HttpStatus.NO_CONTENT.value());
	}
	
}
