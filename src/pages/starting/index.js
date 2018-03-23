import React, {
	Component
} from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import styles from './style';

import {GameMenu} from '@pages';

export default class Starting extends Component {
	openGameMenu() {
		this.props.navigator.push(GameMenu.navigatorOptions);
	}

	render() {
		return(
			<View style={styles.container}>
        <Text style={styles.logo}>MiniTaiko</Text>
        <Text style={styles.logoText}>迷你太阁</Text>

        <TouchableOpacity>
          <Text style={styles.btnStart} onPress={this.openGameMenu.bind(this)}>
            开始游戏
          </Text>
        </TouchableOpacity>
      </View>
		);
	}
}

Starting.navigatorOptions = {
	title: '开始页面',
	screen: 'start-page'
};

Starting.navigatorStyle = {
	navBarHidden: true, // make the nav bar hidden
}