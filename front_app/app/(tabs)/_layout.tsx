import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: false,
        tabBarStyle: { backgroundColor: '#FFFFFF', paddingBottom: 25, paddingTop: 5 }, // {{ edit_1 }}
        tabBarLabelStyle: { color: '#000000' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My Numbers",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "call" : "call-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="numbers"
        options={{
          title: "Buy numbers",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "cart" : "cart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "time" : "time-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
