import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DetalhesNft" />
      <Stack.Screen name="TelaFormCoin" />
      <Stack.Screen name="TelaFormNft" />
    </Stack>
  );
}