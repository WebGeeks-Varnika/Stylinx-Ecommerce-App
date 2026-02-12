import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/userSlice';
import { loginUser } from '../../services/firebaseAuth';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);

      dispatch(
        login({
          email: response.user.email,
          uid: response.user.uid,
           name: response.user.displayName,
        })
      );
    
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

   
      <View style={styles.content}>

        <Text style={styles.title}>Log into</Text>
        <Text style={styles.title}>your account</Text>

        <TextInput
          placeholder="Email address"
          placeholderTextColor="#777"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

    

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>

   
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don’t have an account?
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Signup")}>
          <Text style={styles.signupText}> Sign Up</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E0E',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },

  content: {
    marginTop: 80,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FCFCFD',
  },

  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    color: '#fff',
    fontSize: 14,
    marginTop: 30,
  },

  button: {
    backgroundColor: '#FCFCFD',
    height: 51,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    alignSelf: 'center',
    width: 147,
  },

  buttonText: {
    color: '#141416',
    fontSize: 16,
    fontWeight: '700',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },

  footerText: {
    color: '#FCFCFD',
    fontSize:14,
    fontWeight:500
  },

  signupText: {
    color: '#FCFCFD',
    fontWeight: '500',
    borderBottomWidth:1,
    borderBottomColor:"white",
    fontSize:14
  },
});
