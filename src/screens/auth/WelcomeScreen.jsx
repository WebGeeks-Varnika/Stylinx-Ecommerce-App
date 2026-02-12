import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/icons/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
       <Image
          source={require('../../assets/icons/arrow.png')}
          style={styles.arrow}
          resizeMode="contain"
        />
      </TouchableOpacity>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E0E',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
arrow:{
width:15,
height:12,
    tintColor: '#666668',
},
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:362,
    height:462
  },

  logo: {
    width: 220,
    height: 220,
  },

  button: {
    width:315,
    height:48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-around",
    backgroundColor: '#FCFCFD',
    borderRadius: 30,
    marginBottom: 20,
  },

  buttonText: {
    color: '#666668',
    fontWeight: '600',
    fontSize: 18,
  },

 
});
