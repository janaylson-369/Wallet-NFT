import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {  useTheme } from 'react-native-paper';

export default function TabLayout() {
  const tema = useTheme(); // Puxa as cores dinâmicas do tema (seja claro ou escuro)

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tema.colors.primary, // Usa a cor primária do tema atual
        tabBarInactiveTintColor: tema.colors.onSurfaceVariant, // Usa a cor de superfície variante do tema atual
        tabBarStyle: {
          backgroundColor: tema.colors.surface, // Usa a cor de superfície do tema atual
          borderTopColor: tema.colors.outline, // Usa a cor de contorno do tema atual
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="Nft"
        options={{
          title: 'NFT',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
