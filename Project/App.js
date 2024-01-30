import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { Notifications } from 'expo';

const App = () => {
	const initializePushNotifications = async () => {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== 'granted') {
			console.log('Failed to get push token for push notification!');
			return;
		}

		const token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log('Expo Push Token:', token);
	};

	useEffect(() => {
		initializePushNotifications();
	}, []);

	return <AppNavigator />;
};

export default App;
