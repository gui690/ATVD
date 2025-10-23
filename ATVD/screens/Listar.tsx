         
import { Text, TouchableOpacity, FlatList,ImageBackground,KeyboardAvoidingView,Alert } from 'react-native';
import { useState, useEffect } from 'react';
import React from "react";
import { auth, firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from "../estilo"; 
import { Usuario } from '../model/Usuario';

export default function ListarUsuario() {

  const [uses, SetUses] = useState<Usuario[]>([]);
  const navigation = useNavigation();

  const refuse = firestore.collection("Usuarios");


  const del = async (item) => {
         const resultado = await refuse
         .doc(item.id)
         .delete()
         .then(() =>{
            Alert.alert('Excluido com sucesso!')
            listar()
         })
      }
  const edt = (item: Usuario) => {
          navigation.navigate('Usuario', {uses: item});
      }

  const listar = () => {
    const subscriber = refuse.onSnapshot((query) => {
      const lista: Usuario[] = [];
      query.forEach((documento) => {
        lista.push({
          ...documento.data(),
          key: documento.id
        });
      });
      SetUses(lista);
    });
    return () => subscriber();
  };

  useEffect(() => {
   listar();
  
  });

  return (
      <KeyboardAvoidingView behavior='padding' style={styles.key}>
       <ImageBackground  
              source={require("../assets/fundo.jpg")} 
              resizeMode='stretch'
              style={styles.fundo}
            >
      <Text style={styles.tituloLista}>Listar Usuarios</Text>

      <FlatList
        data={uses}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity  style={styles.cardMotorista}
            onPress={() => edt(item)}
            onLongPress={() => del(item)}
          >
            <Text style={styles.nomeMotorista}>Nome: {item.nome}</Text>
            <Text style={styles.emailMotorista}>Email: {item.email}</Text>
          </TouchableOpacity  >
        )}
      />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

