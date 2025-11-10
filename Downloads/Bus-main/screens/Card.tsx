import { useEffect, useState } from 'react';
import { Text,Alert, View, KeyboardAvoidingView, Button, TouchableOpacity, ImageBackground} from 'react-native';
import { TextInput } from 'react-native-paper';
import { auth, firestore } from '../firebase';
import styles from '../estilo';

import { Picker } from '@react-native-picker/picker';

import { Card } from '../model/Card';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function CardM() {
  const[formCard, setFormCard] = useState<Partial<Card>>({})

  const route = useRoute();         // Cria a rota para receber o Dep no editar

  useEffect( () => {                // Recebe o objeto pet para editar
    if (route.params) {
      setFormCard(route.params.card); // Preenche o form com pet para edição
    }    
  }, [route.params])


  const salvar = () => {
    const refCard = firestore.collection("Card")
    const novoCard = new Card(formCard);        

 if (formCard.id) {
      const idCard  = refCard.doc(formCard.id);

      idCard.update(novoCard.toFirestore())
      .then( () => {
        Alert.alert('Cadastro atualizado!');
         setFormCard({});
      })
    } else {
      const idCard  = refCard.doc();
      novoCard.id = idCard.id;
      idCard.set(novoCard.toFirestore())

      Alert.alert('Cartão adicionado com sucesso!')    
        setFormCard({});
    }
  }
  const limpar = () => {
    setFormCard({});
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.key}>

  <ImageBackground
    source={require("../assets/fundo.jpg")}
    resizeMode="stretch"
    style={styles.fundo}
  >
    <View style={styles.container}>

      <Text style={styles.titulo}>CADASTRO DE CARTÃO</Text>

      <View style={styles.tab}>
        <TextInput
          label="Nome do dono"
          onChangeText={valor => setFormCard({ ...formCard, nome: valor })}
          style={styles.input}
          activeUnderlineColor='#005362'
          value={formCard.nome}
        />

        <View style={styles.inputPicker}>
          <Picker
            mode="dialog"
            onValueChange={valor => setFormCard({ ...formCard, tipo: valor })}
            selectedValue={formCard.tipo}
          >
            <Picker.Item label="Selecione um tipo..." value="0" />
            <Picker.Item label="Crédito" value="Crédito" />
            <Picker.Item label="Débito" value="Débito" />
          </Picker>
        </View>

        <TextInput
          label="Data de validade"
          onChangeText={valor => setFormCard({ ...formCard, validade: valor })}
          style={styles.input}
           activeUnderlineColor='#005362'
          value={formCard.validade}
        />

        <TextInput
          label="Saldo"
          onChangeText={valor => setFormCard({ ...formCard, saldo: valor })}
          style={styles.input}
           activeUnderlineColor='#005362'
          value={formCard.saldo}
        />
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={salvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.button} onPress={limpar}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
</KeyboardAvoidingView>

  );
}