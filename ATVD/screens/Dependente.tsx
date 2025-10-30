import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Button, TouchableOpacity, ImageBackground} from 'react-native';
import { TextInput } from 'react-native-paper';
import { auth, firestore } from '../firebase';
import styles from '../estilo';

import { Picker } from '@react-native-picker/picker';

import { Dependente } from '../model/Dependente';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function CadastroDep() {
  const[formDep, setFormDep] = useState<Partial<Dependente>>({})

  const route = useRoute();         // Cria a rota para receber o Dep no editar

  useEffect( () => {                // Recebe o objeto pet para editar
    if (route.params) {
      setFormDep(route.params.dep); // Preenche o form com pet para edição
    }    
  }, [route.params])

  const salvar = () => {
    const refDep = firestore.collection("Usuario")
        .doc(auth.currentUser?.uid)
        .collection("Dependente")

    const novoDep = new Dependente(formDep);        


    if (formDep.id) {
      const idDep  = refDep.doc(formDep.id);

      idDep.update(novoDep.toFirestore())
      .then( () => {
        alert('Cadastro atualizado!');
        limpar();
      })
    } else {
      const idDep  = refDep.doc();
      novoDep.id = idDep.id;
      idDep.set(novoDep.toFirestore())

      alert('Dependente adicionado com sucesso!')    
      limpar();
    }
  }

  const limpar = () => {
    setFormDep({});
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>

             <ImageBackground  
            source={require("../assets/fundo.jpg")} 
            resizeMode='stretch'
            style={styles.fundo}
          >
         <View style={styles.container}>

        <Text style={styles.titulo}>CADASTRO DE DEPENDENTES</Text>

        <View style={styles.tab}>
          <TextInput 
            label='Nome' 
            onChangeText={valor => setFormDep({
              ...formDep,
              nome : valor
            })}            
            style={styles.input}
            activeUnderlineColor='#005362'
            value={formDep.nome}
          />

          <View style={styles.inputPicker}>
            <Picker
              mode='dialog'
              //prompt='Selecione um tipo...'
              onValueChange={valor => setFormDep({
                ...formDep,
                tipo : valor
              })}
              selectedValue={formDep.tipo}
            >
              <Picker.Item label="Selecione um tipo..." value="0" />
              <Picker.Item label="Filho" value="Filho" />
              <Picker.Item label="Avó"     value="Avó" />
              <Picker.Item label="Avô"  value="Avô" />
              <Picker.Item label="Primo"  value="Primo" />
              <Picker.Item label="Companheira" value="Companheira" />
            </Picker>
          </View>

          <View style={styles.inputPicker}>
            <Picker
              mode='dialog'
              //prompt='Selecione um tipo...'
              onValueChange={valor => setFormDep({
                ...formDep,
                raca : valor
              })}
              selectedValue={formDep.area}
            >
              <Picker.Item label="Selecione uma Área..." value="0" />
              <Picker.Item label="Informatica" value="Informatica" />
              <Picker.Item label="Agropecuária"   value="Agropecuária" />
              <Picker.Item label="Esporte"     value="Esporte" />
              <Picker.Item label="Jurídica"    value="Jurídica" />
              <Picker.Item label="Administrativa" value="Administrativa" />
            </Picker>
          </View>
          
          <TextInput 
            label='Data de Nascimento' 
            onChangeText={valor => setFormDep({
              ...formDep,
              nasc : valor
            })}            
            style={styles.input}
            activeUnderlineColor='#005362'
            value={formDep.nasc}
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.button} onPress={salvar}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.button]} onPress={limpar}>
            <Text style={[styles.buttonText, styles.button]}>Limpar</Text>
          </TouchableOpacity>
        </View>
  </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}