export class Pessoa {
    codigo: number;
}

export class Categoria {
    codigo: number;
}

export class Lancamento {
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: string;
    tipo = 'RECEITA';
    observacao: string;
    categoria = new Categoria();
    pessoa = new Pessoa();
}