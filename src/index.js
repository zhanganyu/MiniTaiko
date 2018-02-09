
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import styles from './style';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>MiniTaiko</Text>

        <TouchableOpacity>
          <Text style={styles.btnStart}>
            开始游戏
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
