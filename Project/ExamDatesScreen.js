import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Notifications } from 'expo';

const ExamDatesScreen = () => {
	const [examDates, setExamDates] = useState([]);
	const [newExamDate, setNewExamDate] = useState('');

	// Initial 5 exam dates when the component mounts
	useEffect(() => {
		setExamDates([
			{ id: '1', subject: 'Math', date: '2023-12-10', time: '10:00 AM' },
			{ id: '2', subject: 'History', date: '2023-12-12', time: '2:00 PM' },
			{ id: '3', subject: 'Physics', date: '2023-12-15', time: '9:30 AM' },
			{ id: '4', subject: 'English', date: '2023-12-18', time: '1:00 PM' },
			{ id: '5', subject: 'Chemistry', date: '2023-12-20', time: '3:30 PM' },
		]);
	}, []);

	const addExamDate = () => {
		if (newExamDate.trim() === '') {
			alert('Please enter a valid exam date.');
			return;
		}

		// Simulate adding an exam date to the local state
		const id = (examDates.length + 1).toString();
		const examDate = {
			id,
			subject: newExamDate,
			date: '2024-01-01',
			time: '12:00 PM',
		};
		setExamDates((prevExamDates) => [...prevExamDates, examDate]);
		setNewExamDate('');
	};

	const renderItem = (item) => {
		return (
			<View style={styles.item}>
				<Text style={styles.subject}>{item.subject}</Text>
				<Text style={styles.dateTime}>{`${item.date} at ${item.time}`}</Text>
			</View>
		);
	};

	const renderEmptyDate = () => {
		return <View style={styles.emptyDate} />;
	};

	const rowHasChanged = (r1, r2) => {
		return r1.name !== r2.name;
	};

	const onDayPress = (day) => {
		console.log('selected day', day);
	};

	useEffect(() => {
		// Schedule notifications when examDates change
		scheduleNotifications();
	}, [examDates]);

	const scheduleNotifications = async () => {
		// Cancel all previously scheduled notifications
		await Notifications.cancelAllScheduledNotificationsAsync();

		// Schedule new notifications for each exam date
		examDates.forEach((examDate) => {
			const scheduleTime = new Date(
				`${examDate.date}T${examDate.time}:00.000Z`
			);
			const notificationMessage = `Upcoming Exam: ${examDate.subject} at ${examDate.time}`;

			Notifications.scheduleNotificationAsync({
				content: {
					title: 'Exam Reminder',
					body: notificationMessage,
				},
				trigger: {
					seconds: (scheduleTime.getTime() - new Date().getTime()) / 1000, // Calculate seconds until the scheduled time
				},
			});
		});
	};
	return (
		<View style={styles.container}>
			<Agenda
				items={{
					...examDates.reduce(
						(acc, item) => ({ ...acc, [item.date]: [item] }),
						{}
					),
				}}
				renderItem={renderItem}
				renderEmptyDate={renderEmptyDate}
				rowHasChanged={rowHasChanged}
				onDayPress={onDayPress}
			/>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Enter new exam date"
					value={newExamDate}
					onChangeText={setNewExamDate}
				/>
				<Button title="Add Exam Date" onPress={addExamDate} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	item: {
		backgroundColor: '#f0f0f0',
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
	},
	subject: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	dateTime: {
		color: '#888',
	},
	emptyDate: {
		height: 15,
		flex: 1,
		paddingTop: 30,
	},
	inputContainer: {
		marginTop: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 4,
		padding: 8,
		marginBottom: 8,
	},
});

export default ExamDatesScreen;
