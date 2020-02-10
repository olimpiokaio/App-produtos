export class Produto {
    constructor (
        public id: string,
        public nome: string,
        public categoria: string,
        public marca: string,
        public preco: number,
        public imageUrl: any
    ) {}
}