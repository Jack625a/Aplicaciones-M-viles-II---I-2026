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

  );
}
