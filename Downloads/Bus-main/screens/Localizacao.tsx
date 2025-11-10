
import { Text, View , TextInput, KeyboardAvoidingView, ImageBackground,Image} from 'react-native';
import { auth, firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "../estilo"; 
import { Localizacao } from '../model/Localizacao';
import { Picker } from '@react-native-picker/picker';



export default function Local() {

     const [formLoc, setFormLoc] = useState<Partial<Localizacao>>({})
  
      const navigation = useNavigation();

     const Salvar = () => {

         const refLoc = firestore.collection("Usuario")

          .doc(auth.currentUser?.uid)
          .collection("Loc")

         const novaLoc = new Localizacao(formLoc);

         const idLoc  = refLoc.doc();
            novaLoc.id = idLoc.id;
            idLoc.set(novaLoc.toFirestore())


          alert('Localização adicionada com sucesso!!')
          setFormLoc({});
    }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.key}>
           <ImageBackground  
            source={require("../assets/fundo.jpg")} 
            resizeMode='stretch'
            style={styles.fundo}
            >

      <Text style={styles.titulo} >Cadastro de Localização</Text>
      
      
          <TextInput style={styles.input} placeholder='latitude'
                     onChangeText={latitude => setFormLoc({
                        ...formLoc,
                        latitude : latitude
                     })}      
          />

         
          <TextInput style={styles.input} placeholder='longitude'
                  onChangeText={longitude => setFormLoc({
                        ...formLoc,
                        longitude : longitude
                     })}    
          />
      
          <TouchableOpacity style={styles.button} onPress={Salvar}>
                <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Menu')}>
                <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
         
    </ImageBackground>
    </KeyboardAvoidingView>
  );
}


