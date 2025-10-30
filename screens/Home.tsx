import { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from "react-native";
import { firestore, auth } from "../firebase";
import styles from "../estilo";
import { useNavigation } from "@react-navigation/native";

export default function Home() {

  const navigation = useNavigation();

 

  const sair = async () => {
    navigation.replace("Login");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.key}>
      <ImageBackground source={require("../assets/fundo.jpg")} resizeMode="stretch" style={styles.fundo}>
       
     

      

        <TouchableOpacity style={styles.buttonHome} onPress={sair}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
