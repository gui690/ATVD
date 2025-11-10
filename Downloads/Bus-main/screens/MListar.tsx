import { Text, TouchableOpacity, FlatList, ImageBackground, KeyboardAvoidingView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import React from "react";
import { firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from "../estilo"; 
import { Motorista } from '../model/Motorista';

export default function ListarMotorista() {
  const [mots, setMots] = useState<Motorista[]>([]);
  const navigation = useNavigation();
  const refmot = firestore.collection("Motoristas");

  const del = async (item: Motorista) => {
    try {
      await refmot.doc(item.id).delete();
      Alert.alert('Excluído com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao excluir:', error.message);
    }
  };

  const edt = (item: Motorista) => {
    navigation.navigate("Motorista", { motorista: item });
  };

  const listar = () => {
    const subscriber = refmot.onSnapshot((query) => {
      const lista: Motorista[] = [];
      query.forEach((documento) => {
        lista.push({
          ...(documento.data() as Motorista),
          id: documento.id,
          key: documento.id,
        });
      });
      setMots(lista);
    });
    return () => subscriber();
  };

  useEffect(() => {
    const unsubscribe = listar();
    return unsubscribe; // desmonta listener quando sai da tela
  }, []);

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.key}>
      <ImageBackground  
        source={require("../assets/fundo.jpg")} 
        resizeMode='stretch'
        style={styles.fundo}
      >
        <Text style={styles.tituloLista}>Lista de Motoristas</Text>

        <FlatList
          data={mots}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardMotorista}
              onPress={() => edt(item)}
              onLongPress={() => del(item)}
            >
              <Text style={styles.nomeMotorista}>Nome: {item.nome}</Text>
              <Text style={styles.emailMotorista}>Email: {item.email}</Text>
            </TouchableOpacity>
          )}
        />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
