class Filme {

    private titulo: string;
    private image: string;
    private date: string;
    private trailer: string;
    private elenco: Array<string>;
    private direcao: Array<string>;
    private sinopse: string

    constructor() {
    }

    public getTitulo(): string {
        return this.titulo;
    }

    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public getDate(): string {
        return this.date;
    }

    public setDate(date: string): void {
        this.date = date;
    }

    public getTrailer(): string {
        return this.trailer;
    }

    public setTrailer(trailer: string): void {
        this.trailer = trailer;
    }

    public getElenco(): Array<string> {
        return this.elenco;
    }

    public setElenco(elenco: Array<string>): void {
        this.elenco = elenco;
    }

    public getDirecao(): Array<string> {
        return this.direcao;
    }

    public setDirecao(direcao: Array<string>): void {
        this.direcao = direcao;
    }

    public getSinopse(): string {
        return this.sinopse;
    }

    public setSinopse(sinopse: string): void {
        this.sinopse = sinopse;
    }
}

export default Filme;