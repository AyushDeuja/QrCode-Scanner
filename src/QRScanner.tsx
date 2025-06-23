import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

const QrScanner = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      codes.forEach(code => {
        if (code.value && !scannedCode) {
          console.log('Scanned QR:', code.value);
          setScannedCode(code.value);
        }
      });
    },
  });

  useEffect(() => {
    requestPermission();
  }, []);

  if (!hasPermission)
    return (
      <View style={styles.centered}>
        <Text>No permission</Text>
      </View>
    );

  if (device == null)
    return (
      <View style={styles.centered}>
        <Text>Device not found</Text>
      </View>
    );

  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={scannedCode === null} // stop scanning after first scan
        codeScanner={codeScanner}
      />
      {scannedCode && (
        <View style={styles.overlay}>
          <Text style={styles.codeText}>Scanned Code:</Text>
          <Text style={styles.codeValue}>{scannedCode}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: '#000000aa',
    padding: 16,
    borderRadius: 10,
  },
  codeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  codeValue: {
    color: '#0f0',
    fontSize: 16,
    marginTop: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QrScanner;
