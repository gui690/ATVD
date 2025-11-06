export class Card {
    public id:      String;
    public nome:    String;
    public tipo:    String;
    public saldo:    String;
    public validade:    String;


    constructor(obj?:Partial<Card>){
        if(obj){
            this.id     = obj.id
            this.nome   = obj.nome
            this.tipo   = obj.tipo
            this.saldo   = obj.saldo
            this.validade   = obj.validade
        }
    }

    toString() {
        const objeto = `{
            "id"    :   "${this.id}",
            "nome"  :   "${this.nome}",
            "tipo"  :   "${this.tipo}" ,
             "saldo"  :   "${this.saldo}" ,
            "validade"  :   "${this.validade}" ,
        }`
        return objeto
    }

    toFirestore(){
        const card = {
            id      : this.id,
            nome    : this.nome,
            tipo    : this.tipo,
            saldo    : this.saldo,
            validade    : this.validade,
        }
        return card
    }

}