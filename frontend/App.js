import React, { useEffect, useRef, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, View } from 'react-native'
import TabNavigations from './Navigations/TabNavigations'
import HomeScreen from './components/Screens/HomeScreen/HomeScreen'
import Login from './components/Authentification/Login'
import Signup from './components/Authentification/Signup'
import Welcome from './components/Welcome'
import DetailsScreen from './components/Screens/HomeScreen/DetailsScreen'
import io from 'socket.io-client';


const connectionConfig = {
  jsonp: false,
  reconnection: false,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ['websocket'],
};

const Stack = createNativeStackNavigator()
const apiUrl = 'http://192.168.18.102:8080';

export default function App() {
  const [socket, setSocket] = useState(io(apiUrl, connectionConfig));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (socket == null) {
      setSocket(io(`${apiURL}`, connectionConfig));
    } else {
      socket.on('connect', () => {
        console.log("SocketIO: Connected.!!!!!!!!!!")
        socket.emit("identifyUser", user.UID);
      });
      socket.on('disconnect', msg => {
        console.log('SocketIO: Disconnected: ', msg);
      });
      if (user == null)
        return;
      socket.emit("identifyUser", user.UID);
    }
  }, [socket, user]);

  useEffect(() => {
    //onLogin();
    return () => {
      socket?.disconnect();
      socket?.removeAllListeners();
      socket?.close();
    }
  }, []);

  const Auth = () => {
    return (<Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        initialParams={{ setUser: setUser }}
        options={{
          headerShown: false,
          setUser,
          x: 5
        }}
      />
      <Stack.Screen
        name='Login'
        component={Login}
        initialParams={{ setUser: setUser }}
        options={({
          headerShown: false,
          setUser,
        })}
      />
      <Stack.Screen
        name='Signup'
        component={Signup}
        initialParams={{ setUser: setUser }}
        options={{
          headerShown: false,
          setUser
        }}
      />
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
    );
  }

  const Tab = ({ route }) => {
    return <TabNavigations socket={socket} user={user} apiUrl={apiUrl} />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        headerMode='none'
        initialRouteName='AUTH'
      >
        <Stack.Screen
          name='AUTH'
          component={Auth}
        />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />

        <Stack.Screen name='MAIN' component={Tab}
          options={{
            socket: { socket: socket },
            user,
            apiUrl,
            setUser
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    flex: 1
  },
  tabBarContainer: {
    height: 2 // Adjust height as needed for your tab bar
  }
})
