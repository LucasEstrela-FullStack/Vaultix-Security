import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface EmergencyModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function EmergencyModal({
  visible,
  onClose,
  onConfirm,
}: EmergencyModalProps) {
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
            Deseja realmente acionar o modo de emergência? Esta ação alertará
            seus contatos de confiança.
          </Text>

          <Text style={styles.readyText}>
            As configurações já foram definidas na tela anterior. Confirme para
            acionar o SOS.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={onClose}
            >
              <Text style={styles.buttonTextCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonConfirm]}
              onPress={onConfirm}
            >
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
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  warning: {
    fontSize: 16,
    color: "#D32F2F",
    marginBottom: 20,
  },
  readyText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: "#E0E0E0",
    marginRight: 10,
  },
  buttonConfirm: {
    backgroundColor: "#D32F2F",
    marginLeft: 10,
  },
  buttonTextCancel: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonTextConfirm: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
