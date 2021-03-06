export class Contato {
    codigo: number;
    nome: string;
    email: string;
    telefone: string;

    constructor(codigo?: number, nome?: string, email?: string, telefone?: string) {
        this.codigo = codigo;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
}

export class Pessoa {
    codigo: number;
    nome: string;
    ativo = true;
    endereco = new Endereco();
    contatos = new Array<Contato>();
}

export class Endereco {
    codigo: number;
    logradouro: string;
    numero: string;
    complemento: string;
    cep: string;
    bairro: string;
    cidade = new Cidade();
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
    anexo: string;
    urlAnexo: string;
}

export class Estado {
    codigo: number;
    nome: string;
}

export class Cidade {
    codigo: number;
    nome: string;
    estado = new Estado();
}