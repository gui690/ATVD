export class Motorista {
  public id: string;
  public nome: string;
  public email: string;
  public senha: string;
  public motorista: string;
  public online: boolean;

  constructor(obj?: Partial<Motorista>) {
    if (obj) {
      this.id = obj.id || "";
      this.nome = obj.nome || "";
      this.email = obj.email || "";
      this.senha = obj.senha || "";
      this.motorista = obj.motorista || "";
      this.online = obj.online ?? false;
    }
  }


    toString(){
        const objeto = `{
            "id"     :    "${this.id}",   
            "nome"   :    "${this.nome}",   
            "email"  :    "${this.email}",   
            "senha"  :    "${this.senha}",  
            "motorista":  "${this.motorista}" 
        }`
        return objeto
    }

    toFirestore(){
        const motorista = {
            id           : this.id,
            nome         : this.nome,
            email        : this.email,
            senha        : this.senha,
            motorista    : this.motorista,
            online: this.online
        }
        return motorista
    }
} 