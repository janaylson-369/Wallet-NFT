import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { 
  PaperProvider, 
  MD3DarkTheme, 
  MD3LightTheme 
} from 'react-native-paper';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="DetalhesNft" options={{ presentation: 'modal' }} />
        <Stack.Screen name="TelaFormCoin" options={{ presentation: 'modal' }} />


      </Stack>
    </PaperProvider>
  );
}