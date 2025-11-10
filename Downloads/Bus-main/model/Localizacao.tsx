export class Localizacao{
    public  id:    string;
    public  motorista:  string;
    public  latitude: string;
    public  longitude: string;

    

    constructor(obj?: Partial<Localizacao>){
        if(obj){
            this.id    = obj.id
            this.motorista  = obj.motorista
            this.latitude = obj.latitude
            this.longitude = obj.longitude
        }
    }

    toString(){
        const objeto = `{
            "id"     :   "${this.id}",   
            "motorista"   :   "${this.motorista}",   
            "latitude"  :   "${this.latitude}",   
            "longitude"  :   "${this.longitude}"
           
        }`
        return objeto
    }

    toFirestore(){
        const localizacao = {
            id      : this.id,
            motorista    : this.motorista,
            latitude   : this.latitude,
            longitude   : this.longitude
            
        }
        return localizacao
    }
} 