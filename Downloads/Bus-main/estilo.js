import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    backgroundColor: "#b0e6e6ff",
    paddingVertical: 9,
    paddingHorizontal: "15%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0c0b01ff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
    margin:7,
    width: "auto",
  },
  buttonText: {
    color: "#050d23ff",
    fontSize: 17,
    fontWeight: "bold",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 70,
    backgroundColor: "rgba(250, 204, 77, 1)", 
    borderRadius: 15,
    width:"80%"
    
  },
   input: {
    marginBottom: 20,
    paddingLeft:8,
    backgroundColor:"white",
    borderRadius:10,
    width: 250

  },
  inputPicker: {
    marginBottom: 20,
    paddingLeft:8,
    backgroundColor:"white",
    borderRadius:10,
    width: 250,
    height: 43

    
    
  },
  textpicker:{
    fontSize:12,
    color:"blue",
  },
 titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000ff",
    marginBottom: 15,
    textAlign: "center",
  },
  aviso: {
    fontSize: 18,
    color: "#ffff", // vermelho para erros
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",

  },
    key: {
    flex: 1,  // Faz com que a view ocupe toda a altura disponível
    justifyContent: 'center', // Alinha o conteúdo ao centro verticalmente
    width:"100%"
  },
  fundo: {
    flex: 1, // A imagem de fundo ocupará toda a tela
    justifyContent: 'center', // Alinha o conteúdo centralizado
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    width:"100%"
  },
 logo: {
  position: "absolute",
  top: 30,       // distância do topo
  right: 20,     // distância da direita
  height: '30%', // mantém o tamanho proporcional
  width: '45%',
  resizeMode: "contain",
  zIndex: 2,     // garante que fique acima dos outros elementos
},

  viewinput:{
 width: "100%",
 justifyContent:"center",
 alignItems:"center"
  
  },
   buttonHome: {
  backgroundColor: "#beaa28ff", 
  paddingVertical: 10,
  borderRadius: 6,
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  marginVertical: 8,
  marginTop:600
},



  cardMotorista: {
    backgroundColor: '#0b275cff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },

  nomeMotorista: {
    fontSize: 18,
    color: '#ffffffff',
    fontWeight: '600',
  },

  emailMotorista: {
    fontSize: 16,
    color: '#e5e90fff',
    fontWeight: '500',
  },

  tituloLista: {
    fontSize: 22,
    color: '#fff703ff',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
   tab: {
 width: 100,
 justifyContent:"center",
 alignItems:"center",
 
  
  
   }
});
