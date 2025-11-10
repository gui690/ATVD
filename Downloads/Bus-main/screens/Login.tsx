
import { Text, View, TextInput, KeyboardAvoidingView, ImageBackground, Image } from 'react-native';
import { useState } from 'react';
import React from "react";
import { TouchableOpacity } from "react-native";
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import styles from "../estilo"; 

export default function Login() {

    const[email,setEmail] =  useState('');
    const[senha,setSenha] =  useState('');

    const navigation = useNavigation();

    const logar = () => {
        auth
        .signInWithEmailAndPassword(email,senha)
        .then(userCredentials => {
            console.log('Logado como: ', userCredentials.user.email);
            navigation.replace("Menu");
        })
        .catch(erro => alert(erro.message))
    }

  return (
     <KeyboardAvoidingView behavior='padding' style={styles.key}>
        <ImageBackground  
         source={require("../assets/fundo.jpg")} 
         resizeMode='stretch'
         style={styles.fundo}
         >
    <View style={styles.container} > 


      <Text style={styles.titulo}>Tela de Login</Text>

    <View style={styles.tab}>
    <TextInput style={styles.input} placeholder='Email'
               onChangeText={email => setEmail(email)}    
    />
    <TextInput style={styles.input} placeholder='Senha'
            onChangeText={senha => setSenha(senha)}  
    />
    </View>
    
    <TouchableOpacity style={styles.button} onPress={logar}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Registro')}>
      <Text style={styles.buttonText}>Cadastrar</Text>
    </TouchableOpacity>
</View>
    </ImageBackground>
    </KeyboardAvoidingView>
  );
}


