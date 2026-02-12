import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home/HomScreen'
import Discover from '../screens/discover/Discover';
import CartScreen from '../screens/cart/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // hide text labels
        tabBarStyle: {
          paddingTop:2,
          paddingBottom:2,
          height:80,
          backgroundColor:"#141416",
         borderTopRightRadius:20,
          borderTopLeftRadius:20,
           borderTopWidth: 0,          // remove white line
  elevation: 0,    position: "absolute",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/home.png')}
              style={{
              width: 25,
                height: 25,
                padding:1,
                tintColor: focused ? '#FFFFFF' : '#636363',
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/search.png')}
              style={{
                 width: 25,
                height: 25,
                padding:1,
                tintColor: focused ? '#FFFFFF' : '#636363',
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/cart.png')}
              style={{
                 width: 25,
                height: 25,
                padding:1,
                tintColor: focused ? '#FFFFFF' : '#636363',
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/person.png')}
              style={{
                width: 25,
                height: 25,
                padding:1,
                tintColor: focused ? '#FFFFFF' : '#636363',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
