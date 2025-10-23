import { View, Text, TextInput, KeyboardAvoidingView, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import React from "react";
import { auth, firestore } from '../firebase';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from "../estilo"; 
import { Usuario } from '../model/Usuario';
import { Picker } from '@react-native-picker/picker';

export default function UsuarioScreen() {

  const [formUse, setFormUse] = useState<Partial<Usuario>>({});
  const navigation = useNavigation();

  const route = useRoute();        //cria a rota para receber o pet no editar

useEffect(() => {                  // recebe o objeto pet para editar
  if (route.params ){
   setFormUse(route.params.uses);  // preenche o form com pet para receber editar
  }
},[route.params])
Usuario
  const Salvar = () => {
   const refUse = firestore&& route.params.uses
   .collection("Usuarios");
 
  const novoUse = new Usuario(formUse);


   if(formUse.id){
     const idUse = refUse.doc(formUse.id);

     idUse.update(novoUse.toFirestore())
     .then(() => {
      Alert.alert('Cadastro atualizado!');
      setFormUse({});
     })
   }else{
    const idUse = refUse.doc();
    novoUse.id = idUse.id;
    idUse.set (novoUse.toFirestore())

    Alert.alert('Sucesso', 'Usuário adicionada com sucesso!!');
    setFormUse({});
   }

  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.key}>
      <ImageBackground  
        source={require("../assets/fundo.jpg")} 
        resizeMode='stretch'
        style={styles.fundo}
      >
      <View  style={styUsuarioles.container}>
        <Text style={styles.titulo}>Tela do Usuário</Text>
       <View style={styles.tab}>
        <TextInput
          style={styles.input}
          placeholder='Nome'
          value={formUse.nome || ''}
          onChangeText={nome => setFormUse({ ...formUse, nome })}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={formUse.email || ''}
          onChangeText={email => setFormUse({ ...formUse, email })}
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