import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

import AuthNavigator from './AuthNavigator';
import BottomTabs from './BottomTabs';
import { login, logout } from '../redux/slices/userSlice';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetails from '../screens/home/ProductDetails';
import HomeScreen from '../screens/home/HomScreen';
import CartScreen from '../screens/cart/CartScreen';
import CheckoutShippingScreen from '../screens/CheckoutShippingScreen/CheckoutShippingScreen'
import PaymentScreen from "../screens/payment/PaymentScreen"
import CategoryProducts from "../screens/CategoryProducts"
import Order from "../screens/Order/Order"
import OrderScreen from "../screens/Order/OrderScreen"
const Stack = createNativeStackNavigator();
export default function RootNavigator() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        dispatch(
          login({
            email: firebaseUser.email,
            uid: firebaseUser.uid,
             name: firebaseUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }

      if (initializing) setInitializing(false);
    });

    return subscriber;
  }, []);

 
  if (initializing) {
    return null;
  }

  return user ? (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    
    {/* <Stack.Screen
      name="Home"
      component={HomeScreen}
    /> */}

<Stack.Screen
  name="MainTabs"
  component={BottomTabs}
/>

    <Stack.Screen
      name="ProductDetails"
      component={ProductDetails}
    />

     <Stack.Screen
      name="CartScreen"
      component={CartScreen}
    />
  <Stack.Screen
      name="CheckoutShippingScreen"
      component={CheckoutShippingScreen}
    />

 <Stack.Screen
      name="PaymentScreen"
      component={PaymentScreen}
    />
<Stack.Screen
      name="Order"
      component={Order}
    />
<Stack.Screen
      name="CategoryProducts"
      component={CategoryProducts}
    />

<Stack.Screen
      name="OrderScreen"
      component={OrderScreen}
    />



  </Stack.Navigator>
) : (
  <AuthNavigator />
);

}
