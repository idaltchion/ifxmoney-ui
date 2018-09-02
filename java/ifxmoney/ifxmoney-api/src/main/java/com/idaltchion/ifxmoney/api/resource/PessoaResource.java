package com.idaltchion.ifxmoney.api.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.idaltchion.ifxmoney.api.event.ResourceCreatedEvent;
import com.idaltchion.ifxmoney.api.model.Pessoa;
import com.idaltchion.ifxmoney.api.repository.PessoaRepository;
import com.idaltchion.ifxmoney.api.service.PessoaService;

@RestController
@RequestMapping("/pessoas")
public class PessoaResource {
	
	@Autowired
	private PessoaRepository pessoaRepository;
	
	
	@Autowired
	private PessoaService pessoaService;
	
	@Autowired
	private ApplicationEventPublisher publisher;

	@GetMapping
	public List<Pessoa> listarPessoas() {
		return pessoaRepository.findAll();
	}
	
	@GetMapping("/{codigo}")
	public ResponseEntity<Pessoa> listarPessoaPeloCodigo(@PathVariable Long codigo) {
		//etapa 1 - buscar no banco
		Pessoa pessoa = pessoaRepository.findById(codigo).orElse(null);
		
		//etapa 2 - montar a resposta para a API
		return pessoa != null ? ResponseEntity.ok(pessoa) : ResponseEntity.notFound().build();
	}
	
	@PostMapping
	public ResponseEntity<Pessoa> adicionarPessoa(@Valid @RequestBody Pessoa pessoa, HttpServletResponse response) {
		//etapa 1 - adicionar no banco
		Pessoa novaPessoa = pessoaRepository.save(pessoa);
		
		//etapa 2 - montar a URI
		publisher.publishEvent(new ResourceCreatedEvent(this, response, novaPessoa.getCodigo()));
		
		//etapa 3 - montar resposta para a API
		return ResponseEntity.status(HttpStatus.CREATED).body(novaPessoa);
	}
	
	@DeleteMapping("/{codigo}")
	//@ResponseStatus(HttpStatus.NO_CONTENT) //Outra maneira, mais direta, de devolver a reposta para a API
	public ResponseEntity<Pessoa> removerPessoa(@PathVariable Long codigo, HttpServletResponse response) {
		//Etapa 1 - remove do banco
		pessoaRepository.deleteById(codigo);
		
		//Etapa 2 - montar resposta para a API
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@PutMapping("/{codigo}")
	public ResponseEntity<Pessoa> atualizarPessoa(@PathVariable Long codigo, @Valid @RequestBody Pessoa pessoa) {
		//Etapa 1 - atualiza as propriedades da pessoa conforme a requisição
		Pessoa pessoaSalva = pessoaService.atualizarPessoa(codigo, pessoa);
		
		//Etapa 2 - retorna as informacoes para a API
		return ResponseEntity.ok(pessoaSalva);
	}
	
	@PutMapping("/{codigo}/ativo")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void atualizarPropriedadeAtivo(@PathVariable Long codigo, @RequestBody Boolean ativo) {
		pessoaService.atualizarPropriedadeAtivo(codigo, ativo);
	}
	
}
