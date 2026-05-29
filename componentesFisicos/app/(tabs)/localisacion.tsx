// Paso 1. Importación de librerías
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, ActivityIndicator, Platform } from "react-native"; // <-- Importamos Platform
import * as Location from 'expo-location';

// Creamos variables vacías para los mapas
let MapView, Marker, MapViewDirections;

//solucion incomptibilidad de la seccion web
if (Platform.OS !=="web"){
    MapView=require('react-native-maps');
    Marker=require("react-native-maps").Marker;
    MapViewDirections=require("react-native-maps-directions").default;

}



export default function GpsPantalla() {
    const [localisacion, setLocalisacion] = useState(null);
    const [mensajeError, setMensajeError] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setMensajeError('Permiso de ubicación denegado...');
                alert("Permisos denegados...");
                return;
            }
            
            let ubicacionActual = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
            setLocalisacion(ubicacionActual);
        })();
    }, []);

    const obtenerUbicacion = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setMensajeError('Permiso de ubicación denegado...');
            return;
        }
        let ubicacionActual = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
        });
        setLocalisacion(ubicacionActual);
    };


    if (!localisacion) {
        return (
            <View style={styles.centrado}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={{ marginTop: 10 }}>Cargando Satélites GPS...</Text>
                {mensajeError && <Text style={{ color: 'red' }}>{mensajeError}</Text>}
            </View>
        );
    }

    const apiMaps = "TU_API_KEY_AQUÍ"; 
    const origen = { latitude: localisacion.coords.latitude, longitude: localisacion.coords.longitude };
    const destino = { latitude: -17.9708429, longitude: -67.1221269 };

    return (
        <View style={styles.contenedor}>
            <View style={styles.panelInfo}>
                <Text style={styles.titulo}>Sensor GPS</Text>
                <Text>Latitud: {localisacion.coords.latitude} </Text>
                <Text>Longitud: {localisacion.coords.longitude} </Text>
                <Button title="Actualizar Ubicación" onPress={obtenerUbicacion} />
            </View>

            <MapView 
                style={styles.mapa}
                initialRegion={{
                    latitude: localisacion.coords.latitude,
                    longitude: localisacion.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
            >
                <Marker
                    coordinate={origen}
                    title="Mi Ubicación Actual"
                    pinColor="blue"
                />

                <Marker
                    coordinate={destino}
                    title="Destino"
                    pinColor="red"
                />

                <MapViewDirections
                    apikey={apiMaps}
                    mode="DRIVING"
                    origin={origen}
                    destination={destino}
                    strokeWidth={4}
                    strokeColor="#6200ee"
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: { flex: 1, backgroundColor: '#fff' },
    centrado: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    panelInfo: { padding: 20, backgroundColor: '#f8f9fa', zIndex: 1 },
    titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
    mapa: { flex: 1 }
});