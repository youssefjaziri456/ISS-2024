
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeScreen from '../../Screens/HomeScreen/HomeScreen';
import Settings from '../../Screens/Settings/Settings'
import ProfileScreen from '../../Screens/ProfileScreen/ProfileScreen'
import Ionicons from "react-native-vector-icons/Ionicons";
import Chat from '../../Screens/Chat/ChatScreen';


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = focused ? "people" : "people-outline";
          }
          if (route.name === "Messages") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          }
          if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          if (route.name === "Home") {
            iconName = focused ? "heart" : "heart-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "pink",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          headerTitleStyle: { fontSize: 16 },
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Chat}
        options={{
          headerShown: false,
          headerTitleStyle: { fontSize: 16 },
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          headerTitleStyle: { fontSize: 14 },
        }}
      />

      
    </Tab.Navigator>
  );
}


// const Tab = createBottomTabNavigator(); 
// export default function TabNavigations() {
//   return (
//     <View>
//    <Tab.Navigator screenOptions={{headerShown:true}} style={{top:827}}>
//     <Tab.Screen 
//     name='home'component={HomeScreen}
//     options={{tabBarLabel:({color})=>(<Text style={{color:color,fontSize:12}}>Home</Text>),
//     tabBarIcon:({color,size})=>(<AntDesign name="home" size={24} color="black" />
//     )
//   }}
//      />
//     <Tab.Screen 
//     name='category'component={CategoryScreen}
//     options={{tabBarLabel:({color})=>(<Text style={{color:color,fontSize:12}}>Category</Text>),
//     tabBarIcon:({color,size})=>(<AntDesign name="search1" size={24} color="black" />
//     )
//   }}
//      />
//     <Tab.Screen 
//     name='profile'component={ProfileScreen}
//     options={{tabBarLabel:({color})=>(<Text style={{color:color,fontSize:12}}>Profile</Text>),
//     tabBarIcon:({color,size})=>(<AntDesign name="profile" size={24} color="black"  />

//     )
//   }}
//      />
//    </Tab.Navigator>
//    </View>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
    
    
//   },
// });