import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

// Mengimport Data User
import Homescreen from "../Home/Homescreen.js"
import Addscreen from "../Add/Addscreen.js"
import Editscreen from "../Edit/Editscreen.js"

const AppIndex = createStackNavigator(

	{
	Home: {
		screen: Homescreen,
		navigationOptions: ({ navigation }) => ({
			title: "Daftar Kontak",
		}),
	},
	Add: {
		screen: Addscreen,
		navigationOptions: ({ navigation }) => ({
			header: null
		}),
	},
	Edit: {
		screen: Editscreen,
		navigationOptions: ({ navigation }) => ({
			header: null
		}),
	}
},
{
	initialRouteName: 'Home',
	navigationOptions: {
		headerStyle: {
			backgroundColor: '#b30059',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
			left: 2,
			fontFamily:"sans-serif-light"
		},
	},
}
)

export default AppIndex;