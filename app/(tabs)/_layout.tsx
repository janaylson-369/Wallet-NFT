import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {  useTheme } from 'react-native-paper';

export default function TabLayout() {
  const tema = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tema.colors.primary, 
        tabBarInactiveTintColor: tema.colors.onSurfaceVariant, 
        tabBarStyle: {
          backgroundColor: tema.colors.surface, 
          borderTopColor: tema.colors.outline, 
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
