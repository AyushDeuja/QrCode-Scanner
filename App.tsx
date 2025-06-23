import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import QrScanner from './src/QRScanner';

function App() {
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <QrScanner />
    </View>
  );
}

export default App;
