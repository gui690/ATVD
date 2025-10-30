import { useEffect, useState } from 'react';
import {Text, KeyboardAvoidingView, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import { auth, firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from '../estilo';


import { Dependente } from '../model/Dependente';


export default function ListarDep() {
    const [deps, setDeps] = useState<Dependente[]>([]);  //Array dos Pets em branco

    const navigation = useNavigation();

    const refDep = firestore.collection("Usuario")
        .doc(auth.currentUser?.uid)
        .collection("Dependente")

    useEffect( () => {
        listar();
    })

    const listar = () => {
        const subscriber = refDep
        .onSnapshot( (query) => { 
            const deps = [];
            query.forEach((documento) => {
                deps.push({
                    ...documento.data(),
                    key: documento.id
                });
            });
            setDeps(deps);
        })
        return () => subscriber();
    }

    const excluir = async(item) => {
        const resultado = await refDep
         .doc(item.id)
         .delete()
         .then( () => {
            alert('Excluído com sucesso!')
            listar()
         })
    }

    const editar = (item: Dependente) => {
        navigation.navigate("Cadastro de Dependente", {dep: item});
    }

    return (
    <KeyboardAvoidingView behavior='padding' style={styles.key}>
               <ImageBackground  
                      source={require("../assets/fundo.jpg")} 
                      resizeMode='stretch'
                      style={styles.fundo}
                    >
              <Text style={styles.tituloLista}>Listar Dependentes</Text>
        
              <FlatList
                data={deps}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                  <TouchableOpacity  style={styles.cardMotorista}
                    onPress={() => editar(item)}
                    onLongPress={() => excluir(item)}
                  >
                    <Text style={styles.nomeMotorista}>Nome: {item.nome}</Text>
                    <Text style={styles.nomeMotorista}>Área: {item.area}</Text>
                    <Text style={styles.nomeMotorista}>Tipo: {item.tipo}</Text>
                    <Text style={styles.nomeMotorista}>Nasc: {item.nasc}</Text>
                  </TouchableOpacity  >
                )}
              />
              </ImageBackground>
            </KeyboardAvoidingView>
    )
}