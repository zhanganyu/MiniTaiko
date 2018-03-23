import React, {
	Component
} from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity
} from 'react-native';

import styles from './style';

export default class GameMenu extends Component {
	navBack() {
		this.props.navigator.pop();
	}
	
	render() {
		return(
			<View style={styles.container}>
			<TouchableOpacity style={styles.navBack} onPress={this.navBack.bind(this)}>
				<Image source={require('@assets/topBack.png')}/>
			</TouchableOpacity>
        <Text style={styles.logo}>菜单</Text>
        
      </View>
		);
	}
}

GameMenu.navigatorOptions = {
	title: '游戏菜单',
	screen: 'game-menu'
};

GameMenu.navigatorStyle = {
	navBarHidden: true, // make the nav bar hidden
}