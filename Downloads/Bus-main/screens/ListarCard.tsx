import { useEffect, useState } from 'react';
import { Text, FlatList, TouchableOpacity, ImageBackground, KeyboardAvoidingView} from 'react-native';
import { auth, firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';


import { Card } from '../model/Card';


export default function ListarCard() {

    const [card, setCards] = useState<Card[]>([]);  //Array dos  em branco

    const navigation = useNavigation();

   const refCard = firestore.collection("Usuario")
        .doc(auth.currentUser?.uid)
        .collection("Card")

         useEffect( () => {
         const unsub = listar();
         return unsub;
    }, []);

  const listar = () => {
        const subscriber = refCard.onSnapshot( (query) => { 
            const lista: card[] = [];
            query.forEach((documento) => {
                lista.push({
                    ...documento.data(),
                    key: documento.id
                });
            });
            setCards(lista);
        })
        return () => subscriber();
    }


   const excluir = async(item) => {
        const resultado = await refCard
         .doc(item.id)
         .delete()
         .then( () => {
            alert('Excluído com sucesso!')
            listar()
         })
    }

 const editar = (item: Card) => {
        navigation.navigate("Card", {card: item});
    }


    return (
    <KeyboardAvoidingView behavior='padding' style={styles.key}>
               <ImageBackground  
                      source={require("../assets/fundo.jpg")} 
                      resizeMode='stretch'
                      style={styles.fundo}
                    >
              <Text style={styles.tituloLista}>Lista de Cartões</Text>
        
              <FlatList
                data={card}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                  <TouchableOpacity  style={styles.cardMotorista}
                    onPress={() => editar(item)}
                    onLongPress={() => excluir(item)}
                  >
                    <Text style={styles.nomeMotorista}>Nome: {item.nome}</Text>
                    <Text style={styles.nomeMotorista}>Tipo: {item.tipo}</Text>
                    <Text style={styles.nomeMotorista}>Validade: {item.validade}</Text>
                    <Text style={styles.nomeMotorista}>Saldo: {item.saldo}</Text>

                  </TouchableOpacity  >
                )}
              />
              </ImageBackground>
            </KeyboardAvoidingView>
    )
}