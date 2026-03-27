import { CameraView,useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet,Text,View } from "react-native";

export default function CamaraPantalla(){
    //Gestion de estados
    const [permiso,peticionPermiso]=useCameraPermissions();
    const [deteccion,setDeteccion]=useState('back') //para la eleccion de la camara delantera o trasera

    if(!permiso)return <View/>

    if(!permiso.granted){
        return(
            <View style={styles.contenedor}>
                <Text>Active los permisos de la camara</Text>
                <Button onPress={peticionPermiso} title="Conceder Permisos"></Button>
            </View>
        );
    }
    //Funcion para activar y mostrar la camara
    function mostrarCamara(){
        setDeteccion(deteccion=>(deteccion==="back"?"front":"back"));
    }
    return(
        <View>
            <CameraView>
                <Button onPress={mostrarCamara} title="Activar la camara">
                </Button>
            </CameraView>
        </View>
    )

}
const styles=StyleSheet.create({
    contenedor:{
        flex:1,
        justifyContent:'center'
    }
})