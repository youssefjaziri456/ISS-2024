import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TabNavigations from './App/Navigations/TabNavigations';

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





