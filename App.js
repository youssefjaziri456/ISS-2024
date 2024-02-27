import { NavigationContainer } from '@react-navigation/native';
//nemnom
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TabNavigations from './App/Navigations/TabNavigations';
import { createNativeStackNavigator } from "@react-navigation/native-stack"

//youssef
import Login from './components/Authentification/Login';
import Signup from './components/Authentification/Signup';
import Welcome from './components/Welcome';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
        <View style={styles.content}>
          <TabNavigations />
        </View>
        <View style={styles.tabBarContainer}>
          {/* This is an empty View to reserve space for the bottom tab bar */}
        </View>
      </NavigationContainer>
      
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  tabBarContainer: {
    height: 2 // Adjust height as needed for your tab bar
  },
});
