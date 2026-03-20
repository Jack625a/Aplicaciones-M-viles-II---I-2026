import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {Ionicons} from '@expo/vector-icons'; //iconos para iOS

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Ionicons name='american-football-outline' size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Opciones',
          tabBarIcon: ({ color }) => <Ionicons name='bonfire-outline' size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='productos'
        options={{
          title:'Productos',
          tabBarIcon:({color})=> <IconSymbol size={28} name='storefront.fill'color={color} /> 

        }}
      />
    </Tabs>
  );
}
