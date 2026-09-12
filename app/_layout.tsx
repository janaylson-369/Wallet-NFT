import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { 
  PaperProvider, 
  MD3DarkTheme, 
  MD3LightTheme 
} from 'react-native-paper';

export default function RootLayout() {
  // Escuta o tema do sistema operacional em tempo real
  const colorScheme = useColorScheme();

  // Define qual tema do Paper usar com base no dispositivo
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </PaperProvider>
  );
}