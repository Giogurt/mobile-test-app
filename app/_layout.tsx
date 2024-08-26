import { Stack } from "expo-router/stack";
import { Image } from "expo-image";

function LogoTitle() {
  return (
    <Image
      source={require("@/assets/logos/doia.png")}
      className="w-20 h-[22px]"
    />
  );
}

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTitle: () => <LogoTitle />,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ title: "test" }} />
      <Stack.Screen
        name="recommendations"
        options={{ title: "Recomendaciones" }}
      />
    </Stack>
  );
}
