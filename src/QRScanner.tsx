import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

const QrScanner = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });

  useEffect(() => {
    requestPermission();
  }, []);

  if (!hasPermission)
    return (
      <View>
        <Text>No permission</Text>;
      </View>
    );
  if (device == null) {
    return (
      <View>
        <Text>Device not found</Text>
      </View>
    );
  }
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      codeScanner={codeScanner}
    />
  );
};

export default QrScanner;
