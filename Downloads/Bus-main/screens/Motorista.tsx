import {View, Text, TextInput, KeyboardAvoidingView, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import React from "react";
import { auth, firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from "../estilo"; 
import { Motorista } from '../model/Motorista';
import { useRoute} from '@react-navigation/native';


export default function MotoristaScreen() {

  const [formMot, setFormMot] = useState<Partial<Motorista>>({});
  const navigation = useNavigation();

  const route = useRoute();        //cria a rota para receber o pet no editar

useEffect(() => {                  // recebe o objeto pet para editar
  if (route.params ){
   setFormMot(route.params.motorista);  // preenche o form com pet para receber editar
  }
},[route.params])

const Salvar = () => {
  const refMot = firestore.collection("Motoristas");
  const novoMot = new Motorista(formMot);

   if(formMot.id){
     const idMot = refMot.doc(formMot.id);

     idMot.update(novoMot.toFirestore())
     .then(() => {
      Alert.alert('Cadastro atualizado!');
      setFormMot({});
     })
   }else{
    const idMot = refMot.doc();
    novoMot.id = idMot.id;
    idMot.set (novoMot.toFirestore())

    Alert.alert('Sucesso', 'Motorista adicionada com sucesso!!');
    setFormMot({});
   }

  }

  /*
  const limpar = () => {
    setFormPet({});
  }
*/
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.key}>
      <ImageBackground  
        source={require("../assets/fundo.jpg")} 
        resizeMode='stretch'
        style={styles.fundo}
      >
      <View  style={styles.container}>
        <Text style={styles.titulo}>Tela do Motorista</Text>
       <View style={styles.tab}>
        <TextInput
          style={styles.input}
          placeholder='Nome'
          value={formMot.nome || ''}
          onChangeText={nome => setFormMot({ ...formMot, nome })}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={formMot.email || ''}
          onChangeText={email => setFormMot({ ...formMot, email })}
        />
        <TextInput
          style={styles.input}
          placeholder='Senha'
          secureTextEntry
          value={formMot.senha || ''}
          onChangeText={senha => setFormMot({ ...formMot, senha })}
        />
        <TextInput
          style={styles.input}
          placeholder='Motorista'
          value={formMot.motorista || ''}
          onChangeText={motorista => setFormMot({ ...formMot, motorista })}
        />
        </View>
        <TouchableOpacity style={styles.button} onPress={Salvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Menu')}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
    </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
