import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<View style={styles.container}>
			<Text>Login Screen</Text>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={(text) => setEmail(text)}
				style={styles.input}
			/>
			<TextInput
				placeholder="Password"
				value={password}
				onChangeText={(text) => setPassword(text)}
				secureTextEntry
				style={styles.input}
			/>
			<Button title="Login" onPress={handleLogin} />
			<Button
				title="Don't have an account? Sign up"
				onPress={() => navigation.navigate('Register')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 4,
		margin: 8,
		padding: 8,
		width: '80%',
	},
});

export default LoginScreen;
