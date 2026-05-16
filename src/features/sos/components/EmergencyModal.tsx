import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

interface EmergencyModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function EmergencyModal({ visible, onClose, onConfirm }: EmergencyModalProps) {
  const [shareLocation, setShareLocation] = useState(false);
  const [recordAudio, setRecordAudio] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Confirmação de Emergência</Text>
          <Text style={styles.warning}>
            Deseja realmente acionar o modo de emergência? Esta ação alertará seus contatos de confiança.
          </Text>

          <View style={styles.optionContainer}>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Compartilhar Localização</Text>
              <Text style={styles.optionSubtitle}>Apenas a localização atual, temporariamente.</Text>
            </View>
            <Switch
              value={shareLocation}
              onValueChange={setShareLocation}
              trackColor={{ false: '#ccc', true: '#4CAF50' }}
              thumbColor={shareLocation ? '#fff' : '#fff'}
            />
          </View>

          <View style={styles.optionContainer}>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Gravar Áudio (15s)</Text>
              <Text style={styles.optionSubtitle}>Gravação temporária para contexto da emergência.</Text>
            </View>
            <Switch
              value={recordAudio}
              onValueChange={setRecordAudio}
              trackColor={{ false: '#ccc', true: '#4CAF50' }}
              thumbColor={recordAudio ? '#fff' : '#fff'}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={onClose}>
              <Text style={styles.buttonTextCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonConfirm]} onPress={onConfirm}>
              <Text style={styles.buttonTextConfirm}>Acionar SOS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  warning: {
    fontSize: 16,
    color: '#D32F2F',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 12,
  },
  optionTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  buttonConfirm: {
    backgroundColor: '#D32F2F',
    marginLeft: 10,
  },
  buttonTextCancel: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonTextConfirm: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
