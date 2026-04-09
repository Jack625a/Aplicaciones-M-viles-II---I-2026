//Paso 1. importacion de librerias
import React, {useState,useEffect } from "react";
import {Text,View,StyleSheet,Button,Alert} from "react-native"
import * as Location from 'expo-location'

export default function gpsPantalla(){
    //Paso 2. Gestion de estados
    const [localisacion,setLocalisacion]=useState(null);
    const [mensajeError,setMensajeError]=useState(null);

    //Paso3. Funcion para obtener la ubicacion
    const obtenerUbicacion= async()=>{
        //Pedir los permisos
        let {status}=await Location.requestForegroundPermissionsAsync();

        if (status!== 'granted'){
            setMensajeError('Permiso de ubicacion denegado...');
            return;
        }
        //Obtener la latitud y longitud 
        let ubicacionActual=await Location.getCurrentPositionAsync({
            accuracy:Location.Accuracy.Balanced,
        });
        setLocalisacion(ubicacionActual)
    };

    return(
        <View>
            <Text>Sensor GPS</Text>
            {localisacion? (
                <View>
                    <Text>Latitud: {localisacion.coords.latitude} </Text>
                    <Text>Longitud: {localisacion.coords.longitude} </Text>
                </View>
            ):(
                <Text>Error vuelva a intentarlo</Text>
            )
        }
        <Button title="Obtener Ubicacion" onPress={obtenerUbicacion}></Button>
        </View>
    );
}