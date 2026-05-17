import * as SecureStore from "expo-secure-store";
import { Settings2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import EmergencyModal from "../components/EmergencyModal";
import SosButton from "../components/SosButton";

const STORAGE_KEYS = {
  trustedContact: "sos_trusted_contact",
  shareLocation: "sos_share_location",
  recordAudio: "sos_record_audio",
};

const parseBoolean = (value: string | null, fallback: boolean) => {
  if (value === null) {
    return fallback;
  }
  return value === "true";
};

export default function SosScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showConfigPopup, setShowConfigPopup] = useState(false);
  const [trustedContact, setTrustedContact] = useState("");
  const [shareLocation, setShareLocation] = useState(true);
  const [recordAudio, setRecordAudio] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      const storedContact = await SecureStore.getItemAsync(
        STORAGE_KEYS.trustedContact,
      );
      const storedShareLocation = await SecureStore.getItemAsync(
        STORAGE_KEYS.shareLocation,
      );
      const storedRecordAudio = await SecureStore.getItemAsync(
        STORAGE_KEYS.recordAudio,
      );

      setTrustedContact(storedContact ?? "");
      setShareLocation(parseBoolean(storedShareLocation, true));
      setRecordAudio(parseBoolean(storedRecordAudio, false));
    }

    loadConfig();
  }, []);

  const handleSosPress = () => {
    setModalVisible(true);
  };

  const handleOpenConfigPopup = () => {
    setShowConfigPopup(true);
  };

  const handleCloseConfigPopup = () => {
    setShowConfigPopup(false);
  };

  const handleSaveConfig = async () => {
    await SecureStore.setItemAsync(STORAGE_KEYS.trustedContact, trustedContact);
    await SecureStore.setItemAsync(
      STORAGE_KEYS.shareLocation,
      shareLocation ? "true" : "false",
    );
    await SecureStore.setItemAsync(
      STORAGE_KEYS.recordAudio,
      recordAudio ? "true" : "false",
    );

    setShowConfigPopup(false);
    Alert.alert(
      "Configurações salvas",
      "As informações do SOS foram atualizadas.",
    );
  };

  const handleConfirmEmergency = () => {
    setModalVisible(false);
    Alert.alert(
      "Alerta Enviado",
      `Seu contato de confiança foi notificado. Localização: ${shareLocation ? "Sim" : "Não"}, Gravação de áudio: ${recordAudio ? "Sim" : "Não"}.${
        trustedContact ? ` Contato confiável: ${trustedContact}` : ""
      }`,
      [{ text: "OK" }],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>SOS Preventivo</Text>
          <Text style={styles.subtitle}>
            Acione apenas em caso de emergência. Suas ações são consentidas e
            protegidas.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleOpenConfigPopup}
        >
          <Settings2 size={26} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <View style={styles.configCard}>
        <Text style={styles.configTitle}>Configuração do SOS</Text>
        <Text style={styles.configDescription}>
          Essas opções são carregadas da aba de configurações do app.
        </Text>

        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Contato confiável</Text>
          <Text style={styles.configValue}>
            {trustedContact || "Ainda não definido"}
          </Text>
        </View>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Compartilhar localização</Text>
          <Text style={styles.configValue}>
            {shareLocation ? "Sim" : "Não"}
          </Text>
        </View>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Gravar áudio</Text>
          <Text style={styles.configValue}>{recordAudio ? "Sim" : "Não"}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <SosButton onPress={handleSosPress} />
      </View>

      <EmergencyModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmEmergency}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfigPopup}
        onRequestClose={handleCloseConfigPopup}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupCard}>
            <Text style={styles.popupTitle}>Configurar SOS</Text>
            <Text style={styles.popupSubtitle}>
              Preencha as informações abaixo e depois pressione Voltar para
              retornar.
            </Text>

            <View style={styles.popupField}>
              <Text style={styles.popupLabel}>Contato confiável</Text>
              <TextInput
                style={styles.popupInput}
                placeholder="Número do contato"
                keyboardType="phone-pad"
                value={trustedContact}
                onChangeText={setTrustedContact}
              />
            </View>

            <View style={styles.popupRow}>
              <Text style={styles.popupLabel}>Compartilhar localização</Text>
              <Switch
                value={shareLocation}
                onValueChange={setShareLocation}
                trackColor={{ false: "#ccc", true: "#4CAF50" }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.popupRow}>
              <Text style={styles.popupLabel}>Gravar áudio</Text>
              <Switch
                value={recordAudio}
                onValueChange={setRecordAudio}
                trackColor={{ false: "#ccc", true: "#4CAF50" }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.popupButtons}>
              <TouchableOpacity
                style={[styles.popupButton, styles.popupButtonSecondary]}
                onPress={handleCloseConfigPopup}
              >
                <Text style={styles.popupButtonText}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.popupButton, styles.popupButtonPrimary]}
                onPress={handleSaveConfig}
              >
                <Text
                  style={[
                    styles.popupButtonText,
                    styles.popupButtonTextPrimary,
                  ]}
                >
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#D32F2F",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  configCard: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  configTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#20232A",
    marginBottom: 8,
  },
  configDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  configRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  configLabel: {
    fontSize: 15,
    color: "#334155",
    flex: 1,
    marginRight: 10,
  },
  configValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  titleBlock: {
    flex: 1,
    paddingRight: 10,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  popupCard: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
  popupTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 10,
  },
  popupSubtitle: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 20,
  },
  popupField: {
    marginBottom: 18,
  },
  popupLabel: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 8,
  },
  popupInput: {
    width: "100%",
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    fontSize: 15,
  },
  popupRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  popupButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  popupButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  popupButtonSecondary: {
    backgroundColor: "#E2E8F0",
  },
  popupButtonPrimary: {
    backgroundColor: "#0F172A",
  },
  popupButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  popupButtonTextPrimary: {
    color: "#FFFFFF",
  },
});
