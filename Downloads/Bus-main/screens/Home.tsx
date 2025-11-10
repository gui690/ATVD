import { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from "react-native";
import { firestore, auth } from "../firebase";
import { Motorista } from "../model/Motorista";
import styles from "../estilo";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [mots, setMots] = useState<Motorista[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firestore
      .collection("Motoristas")
      .where("online", "==", true)
      .onSnapshot((querySnapshot) => {
        const lista: Motorista[] = [];
        querySnapshot.forEach((doc) => {
          lista.push({ ...doc.data(), key: doc.id } as Motorista);
        });
        setMots(lista);
      });

    return unsubscribe;
  }, []);

  const sair = async () => {
    navigation.replace("Login");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.key}>

      <ImageBackground source={require("../assets/fundo.jpg")} resizeMode="stretch" style={styles.fundo}>

        <Text style={styles.tituloLista}>Motoristas</Text>

        <FlatList
          data={mots}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.cardMotorista}>
              <Text style={styles.nomeMotorista}>Nome: {item.nome}</Text>
              <Text>Status: 🟢 ONLINE</Text>
            </View>
          )}
        />

        <TouchableOpacity style={styles.buttonHome} onPress={sair}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
