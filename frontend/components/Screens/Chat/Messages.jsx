import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Navigator,
  AlertIOS,
  Dimensions,
  Image
} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from "./chat";
import Chats from "./Chats";

const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  item: {
    padding: 10,
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#819FF7"
  },
  profileBar: {
    height: 150,
    width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(50,200,50, .5)"
  },
  emitterUID: {
    color: "#FFF",
    padding: 5,
    fontSize: 25
  },
  button: {
    padding: 5
  }
});

export default function Messages({ navigation, route }) {
    const { user, socket, apiUrl } = route.params;
    const [targetUser, setTargetUser] = useState(null);
    return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chats"
        component={Chats} 
        initialParams={{
          socket: socket,
          user: user,
          apiUrl: apiUrl,
          setTargetUser
        }}
        options={{
          headerShown: false,
          headerTitleStyle: { fontSize: 16 },
          socket: socket,
          user: user,
          apiUrl: apiUrl,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        initialParams={{
          socket: socket,
          user: user,
          apiUrl: apiUrl,
        }}
        options={{
          headerShown: true,
          headerTitleStyle: { fontSize: 16 },
          socket: socket,
          user: user,
          apiUrl: apiUrl,
        }}
      />
    </Stack.Navigator>
  );
}
