//pso 1. librerias
import React,{useState} from 'react';
import {Text, StyleSheet, Button, TextInput, Alert} from 'react-native';
import {useRouter} from 'expo-router';

//librerias firebase
import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword, 
    getRedirectResult} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  
};

const app=initializeApp(firebaseConfig)
const auth=initializeAuth(app)

export default function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const router=useRouter();

    //funcion para ingresar
    const entrar =async()=>{
        try{
            await signInWithEmailAndPassword(auth,email,password);
            Alert.alert("EXITOSO","Inicio de sesion exitoso")
            router.replace('/(tabs)/localisacion');
        }catch(error){
            Alert.alert("Error","Datos incorrectos - Error vuelva a intentar")
        }
    };

    //funcion para registrar
    const registrar= async(){
        try{
            await createUserWithEmailAndPassword(auth,email,password);
            Alert.alert("REGISTRO EXITOSO","Usuario registrado correctamente");
            router.replace("/(tabs)/explore");
        }catch(error){
            Alert.alert("ERROR", "Error de registro, vuelva a intentarlo");
        }
    };
}