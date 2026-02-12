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
import { signupUser } from '../../services/firebaseAuth';

export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await signupUser(email, password,name);

      dispatch(
        login({
          email: response.user.email,
          uid: response.user.uid,
          name: name,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

 <View style={styles.content}>

        <Text style={styles.title}>Create</Text>
        <Text style={styles.title}>your account</Text>

        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#777"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

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

        <TextInput
          placeholder="Confirm password"
          placeholderTextColor="#777"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}> Log In</Text>
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
    borderBottomColor: '#B1B5C3',
    color: '#FCFCFD',
    fontSize: 14,
    marginTop: 30,
    fontWeight:300
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
     fontWeight: '500',
    fontSize:14
  },

  loginText: {
    color: '#FCFCFD',
    fontWeight: '500',
    fontSize:14,
    borderBottomWidth:1,
    borderBottomColor:'#FCFCFD'
  },
});
