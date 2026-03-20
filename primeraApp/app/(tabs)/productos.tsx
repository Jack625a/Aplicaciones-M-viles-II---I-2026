import { Text, StyleSheet,Image,Button, View} from "react-native";

export default function PantallaProductos(){
    return(
        <View style={styles.contenedor}>
            <Text>Pantalla de Productos</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    contenedor:{
        backgroundColor:'red',

    }
})