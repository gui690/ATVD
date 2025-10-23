export class Usuario {
  public id: string;
  public nome: string;
  public email: string;
  public senha: string;
  public data: string;
  public tipo: string;

  constructor(obj?: Partial<Usuario>){
    if (obj){
      this.id = obj.id || '';
      this.nome = obj.nome || '';
      this.email = obj.email || '';
      this.senha = obj.senha || '';
      this.data = obj.data || '';
      this.tipo = obj.tipo || '';
    }
  };

  toString() {
    return JSON.stringify({
      id: this.id,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      data: this.data,
      tipo: this.tipo
    }, null, 2);
  }

  toFirestore() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      data: this.data,
      tipo: this.tipo
    };


  }
}
