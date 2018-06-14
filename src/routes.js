import React from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';
import SplashScreen from './auth/screens/splash.screen';
import LoginScreen from './auth/screens/auth.screen';
import MyGistsScreen from './gists/screens/mygists.screen';
import PublicGistsScreen from './gists/screens/publicgists.screen';
import StarredGistsScreen from './gists/screens/starredgists.screen';
import ClearCacheScreen from './cache/screens/cache.screen.js';
import GistDetailsScreen from './gists/screens/gistdetails.screen';
import GistFileContentScreen from './gists/screens/gistfilecontent.screen';
import GistContentListScreen from './gists/screens/gistContentList.screen';
import GistCommentsScreen from './gists/screens/gistComments.screen';

const styles = StyleSheet.create({
	tabStyle: {
		backgroundColor: '#33B5E5',
	},
	labelStyle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
	},
});

const MainTabsScreen = TabNavigator({
	MyGists: {
		screen: MyGistsScreen,
		navigationOptions: {
			tabBarLabel: 'My Gists',
		},
	},
	StarredGists: {
		screen: StarredGistsScreen,
		navigationOptions: {
			tabBarLabel: 'Starred',
		},
	},
	PublicGists: {
		screen: PublicGistsScreen,
		navigationOptions: {
			tabBarLabel: 'Public Gists',
		},
	},
}, {
	tabBarOptions: {
		showLabel: true,
		tintColor: 'blue',
		style: styles.tabStyle,
		labelStyle: styles.labelStyle,
	},
	animationEnabled: true,
	tabBarPosition: 'top',
});

const GistFileContentAndCommentsScreen = TabNavigator({
	GistContent: {
		screen: GistContentListScreen,
		navigationOptions: {
			tabBarLabel: 'Content',
		},
	},
	GistComments: {
		screen: GistCommentsScreen,
		navigationOptions: {
			tabBarLabel: 'Comments',
		},
	},
}, {
	tabBarOptions: {
		showLabel: true,
		tintColor: 'blue',
		style: styles.tabStyle,
		labelStyle: styles.labelStyle,
	},

});

// GistFileContentAndCommentsScreen.navigationOptions = {
// 	header: GistDetailsScreen,
// };

const MainScreen = StackNavigator({
	MainTabs: {
		screen: MainTabsScreen,
		navigationOptions: {
			header: null,
		},
	},
	GistDetails: {
		screen: GistFileContentAndCommentsScreen,
		headerMode: 'screen',
		navigationOptions: ({ navigation }) => ({
			header: <GistDetailsScreen navigation={navigation} />,
		}),
	},
	GistFileContentView: {
		screen: GistFileContentScreen,
		navigationOptions: {
			header: null,
		},
	},
});

const Home = DrawerNavigator({
	Home: {
		screen: MainScreen,
	},
	ClearCache: {
		screen: ClearCacheScreen,
	},
});

export const GistApp = StackNavigator(
	{
		Splash: {
			screen: SplashScreen,
			navigationOptions: {
				header: null,
			},
		},
		Login: {
			screen: LoginScreen,
			navigationOptions: {
				header: null,
			},
		},
		Home: {
			screen: Home,
			navigationOptions: {
				header: null,
			},
		},
	},
	{
		URIPrefix: 'gitgistrn://',
	}
);
