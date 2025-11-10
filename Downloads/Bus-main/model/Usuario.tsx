export class Usuario{
    public  id:    string;
    public  nome:  string;
    public  email: string;
    public  senha: string;
    public  tipo:  string;
    public  motorista:  string;
    

    constructor(obj?: Partial<Usuario>){
        if(obj){
            this.id    = obj.id
            this.nome  = obj.nome
            this.email = obj.email
            this.senha = obj.senha
            this.tipo  = obj.tipo
            this.motorista  = obj.motorista
        }
    }

    toString(){
        const objeto = `{
            "id"     :    "${this.id}",   
            "nome"   :    "${this.nome}",   
            "email"  :    "${this.email}",   
            "senha"  :    "${this.senha}",   
            "tipo"   :    "${this.tipo}" ,
            "motorista":  "${this.motorista}" 
        }`
        return objeto
    }

    toFirestore(){
        const usuario = {
            id           : this.id,
            nome         : this.nome,
            email        : this.email,
            senha        : this.senha,
            tipo         : this.tipo,
            motorista    : this.motorista
        }
        return usuario
    }
} 