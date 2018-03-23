import { Navigation } from 'react-native-navigation';

import * as Pages from '@pages';

/* register all of the pages here */
for (const [key, Page] of Object.entries(Pages)) {
  Navigation.registerComponent(Page.navigatorOptions.screen, () => Page);
}

Navigation.startSingleScreenApp({
	screen: Pages.Starting.navigatorOptions,
	drawer: {
	},
	passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
	animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});