import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import QrScanner from './src/QRScanner';
import OSM from './src/OSM';

function App() {
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <QrScanner />
      {/* <OSM /> */}
    </View>
  );
}

export default App;
