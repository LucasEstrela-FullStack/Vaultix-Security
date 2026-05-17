import { Tabs } from "expo-router";
import { BookOpen, HeartHandshake, Shield } from "lucide-react-native";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "../../components/haptic-tab";
import { Colors } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme() as "light" | "dark" | null | undefined;

  return (
    <Tabs
      initialRouteName="help"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="help"
        options={{
          title: "Acolhimento",
          tabBarIcon: ({ color }) => <HeartHandshake size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: "SOS",
          tabBarIcon: ({ color }) => <Shield size={28} color={color} />,
        }}
      />
      {/* Config tab removed — configuration is handled inside the SOS screen */}
      <Tabs.Screen
        name="quiz"
        options={{
          title: "Educação",
          tabBarIcon: ({ color }) => <BookOpen size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
