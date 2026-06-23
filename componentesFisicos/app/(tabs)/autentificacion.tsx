import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from "react-native";

import { useRouter } from "expo-router";

// Firebase
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

// Configuración Firebase
const firebaseConfig = {
  
 
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // Iniciar sesión
  const entrar = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      Alert.alert(
        "ÉXITO",
        "Inicio de sesión correcto"
      );

      router.replace("/(tabs)/localisacion");

    } catch (error) {
      Alert.alert(
        "ERROR",
        error.message
      );
    }
  };

  // Registrar usuario
  const registrar = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      Alert.alert(
        "REGISTRO EXITOSO",
        "Usuario registrado correctamente"
      );

      router.replace("/(tabs)/explore");

    } catch (error) {
      Alert.alert(
        "ERROR",
        error.message
      );
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text>Inicio de Sesion Firebase</Text>
      <TextInput
        style={styles.cajas}
        placeholder="Ingrese su correo: "
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Ingrese su contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View>
        <Button
          title="Iniciar Sesion"
          onPress={entrar}
        />
      </View>
      <View>
        <Button
          title="Registrarse"
          onPress={registrar}
        />
      </View>
      
    </View>

  );
}

const styles=StyleSheet.create({
  contenedor:{
    padding:20,
    flex: 1,
    justifyContent:"center"
  },
  cajas:{
    width:100,
    borderColor:"rgb(154, 153, 153)",
    borderWidth:2
  }

})
