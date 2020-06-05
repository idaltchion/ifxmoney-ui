export class Pessoa {
    codigo: number;
    nome: string;
    ativo = true;
    endereco = new Endereco();
}

export class Endereco {
    codigo: number;
    logradouro: string;
    numero: string;
    complemento: string;
    cep: string;
    bairro: string;
    cidade: string;
    estado: string;
}

export class Categoria {
    codigo: number;
}

export class Lancamento {
    codigo: number;
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: string;
    tipo = 'RECEITA';
    observacao: string;
    categoria = new Categoria();
    pessoa = new Pessoa();
}

export class Usuario {
    email: string;
    senha: string;
}