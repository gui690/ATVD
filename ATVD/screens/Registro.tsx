import { Text, View, TextInput, KeyboardAvoidingView, ImageBackground, TouchableOpacity } from 'react-native';
import { auth, firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import React from "react";
import styles from "../estilo"; 
import { Usuario } from '../model/Usuario';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default function Registro() {
  const [formUsuario, setFormUsuario] = useState<Partial<Usuario>>({});

  const [visivel, setVisivel] = useState(false);
  
  const navigation = useNavigation();

  const confirmarData = (dataSelecionada) => {
    setVisivel(false);
    setFormUsuario({
      ...formUsuario,
      data: Timestamp.fromDate(dataSelecionada),
    });
  };

  const cancelar = () => setVisivel(false);

  const registrar = () => {
       auth
        .createUserWithEmailAndPassword(formUsuario.email,formUsuario.senha)
        .then(userCredentials => {
            console.log('Logado como: '+ userCredentials.user.email);
         
           const refUsuario = firestore.collection("Usuario");
            const idUsuario  = refUsuario.doc(auth.currentUser.uid);
            idUsuario.set({
                  id    : auth.currentUser.uid,
                  nome  : formUsuario.nome,
                  email : formUsuario.email,
                  data : formUsuario.data,
                  senha : formUsuario.senha,
                  tipo  : formUsuario.tipo
            })
               navigation.replace("Menu");
      })
      .catch((erro) => alert(erro.message));
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.key}>
      <ImageBackground  
        source={require("../assets/fundo.jpg")} 
        resizeMode='stretch'
        style={styles.fundo}
      >
        <View style={styles.container}>
          <Text style={styles.titulo}>Cadastro de Usuário</Text>

          <View style={styles.tab}>
            <TextInput
              style={styles.input}
              placeholder='Nome'
              onChangeText={nome => setFormUsuario({ ...formUsuario, nome })}
            />

            <TextInput
              style={styles.input}
              placeholder='Email'
              onChangeText={email => setFormUsuario({ ...formUsuario, email })}
            />
           
           <View style={styles.input}>
            <TouchableOpacity style={styles.input} onPress={() => setVisivel(true)}>
              <Text style={{ color: formUsuario.data ? '#000' : '#999' }}>
                {formUsuario.data
                  ? new Date(formUsuario.data.seconds * 1000).toLocaleDateString('pt-BR')
                  : 'Data de Nascimento'}
              </Text>
            </TouchableOpacity>

            <DateTimePicker
              isVisible={visivel}
              mode="date"
              onConfirm={confirmarData}
              onCancel={cancelar}
              maximumDate={new Date()}
            />
            </View>
            <TextInput
              style={styles.input}
              placeholder='Senha'
              secureTextEntry
              onChangeText={senha => setFormUsuario({ ...formUsuario, senha })}
            />

            <View style={styles.inputPicker}>
              <Picker
                mode='dropdown'
                prompt='Selecione um tipo...'
                selectedValue={formUsuario.tipo}
                onValueChange={tipo => setFormUsuario({ ...formUsuario, tipo })}
              >
                <Picker.Item label="Selecione" value="Selecione" style={styles.textpicker}/>
                <Picker.Item label="Deficiente" value="Deficiente" style={styles.textpicker}/>
                <Picker.Item label="Estudante" value="Estudante" style={styles.textpicker}/>
                <Picker.Item label="Idoso" value="Idoso" style={styles.textpicker}/>
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={registrar}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login')}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
