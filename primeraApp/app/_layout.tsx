import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import {Drawer} from "expo-router/drawer"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (

    <>
    <GestureHandlerRootView style={{flex:1}}>
      <Drawer
    
    screenOptions={{
      headerShown:true,
      headerTitleAlign:'center',
      headerStyle:{
        backgroundColor:'#ff0000',
      },
      headerTintColor:'#fff',
    }}>
      <Drawer.Screen
          name='Inicio'
          options={{
            drawerLabel:"Inicio",
            title:"Mi aplicacion",
            drawerIcon:({color})=>(
              <Ionicons name='home-outline' size={22} color={color} />
            ),
          }}
      />
      <Drawer.Screen
          name='configuracion'
          options={{
            drawerLabel:"Configuracion",
            title:"Mi aplicacion",
            drawerIcon:({color})=>(
              <Ionicons name='settings-outline' size={22} color={color} />
            ),
          }}
      />


    </Drawer>
    </GestureHandlerRootView>
    
    
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider></>
  );
}
