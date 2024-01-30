import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebase';

const RegisterScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			// Navigate to ExamDatesScreen after successful registration
			navigation.navigate('ExamDates');
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<View style={styles.container}>
			<Text>Register Screen</Text>
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
			<Button title="Register" onPress={handleRegister} />
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

export default RegisterScreen;
