import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import SosButton from '../components/SosButton';
import EmergencyModal from '../components/EmergencyModal';

export default function SosScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSosPress = () => {
    setModalVisible(true);
  };

  const handleConfirmEmergency = () => {
    setModalVisible(false);
    Alert.alert(
      'Alerta Enviado',
      'Seu contato de confiança foi notificado e sua localização compartilhada temporariamente.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOS Preventivo</Text>
      <Text style={styles.subtitle}>
        Acione apenas em caso de emergência. Suas ações são consentidas e protegidas.
      </Text>

      <View style={styles.buttonContainer}>
        <SosButton onPress={handleSosPress} />
      </View>

      <EmergencyModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onConfirm={handleConfirmEmergency} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
