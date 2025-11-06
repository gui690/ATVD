export class Dependente {
    public id:      string;
    public nome:    string;
    public tipo:    string;
    public area:    string;
    public nasc:    string;

    constructor(obj?:Partial<Dependente>){
        if(obj){
            this.id     = obj.id
            this.nome   = obj.nome
            this.tipo   = obj.tipo
            this.area   = obj.area
            this.nasc   = obj.nasc
        }
    }

    toString() {
        const objeto = `{
            "id"    :   "${this.id}",
            "nome"  :   "${this.nome}",
            "tipo"  :   "${this.tipo}" ,
             "area"  :   "${this.area}" ,
            "nasc"  :   "${this.nasc}
        }`
        return objeto
    }

    toFirestore(){
        const dependente = {
            id      : this.id,
            nome    : this.nome,
            tipo    : this.tipo,
            area    : this.area,
            nasc    : this.nasc
        }
        return dependente
    }

}