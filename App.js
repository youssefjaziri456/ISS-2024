import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, View } from 'react-native'
import TabNavigations from './Navigations/TabNavigations'
import HomeScreen from './components/Screens/HomeScreen/HomeScreen'
import Login from './components/Authentification/Login'
import Signup from './components/Authentification/Signup'
import Welcome from './components/Welcome'
import DetailsScreen from './components/Screens/HomeScreen/DetailsScreen'

const Stack = createNativeStackNavigator()

export default function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
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
          component={() => (
            <Stack.Navigator initialRouteName='Welcome'>
              <Stack.Screen
                name='Welcome'
                component={Welcome}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='Login'
                component={Login}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='Signup'
                component={Signup}
                options={{
                  headerShown: false
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
          )}
        />
         <Stack.Screen name="DetailsScreen" component={DetailsScreen} />

        <Stack.Screen name='MAIN' component={() => <TabNavigations />} />
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
