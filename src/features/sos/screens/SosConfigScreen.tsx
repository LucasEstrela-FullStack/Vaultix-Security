import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

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

export default function SosConfigScreen() {
  const [trustedContact, setTrustedContact] = useState("");
  const [shareLocation, setShareLocation] = useState(true);
  const [recordAudio, setRecordAudio] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
      setLoading(false);
    }

    loadConfig();
  }, []);

  const handleSaveConfig = async () => {
    setSaving(true);
    await SecureStore.setItemAsync(STORAGE_KEYS.trustedContact, trustedContact);
    await SecureStore.setItemAsync(
      STORAGE_KEYS.shareLocation,
      shareLocation ? "true" : "false",
    );
    await SecureStore.setItemAsync(
      STORAGE_KEYS.recordAudio,
      recordAudio ? "true" : "false",
    );
    setSaving(false);
    Alert.alert("Configurações salvas", "As opções de SOS foram atualizadas.");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Configurações do SOS</Text>
        <Text style={styles.subtitle}>
          Aqui você define uma vez as opções de emergência que valem para todo o
          app.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Contato confiável</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Digite o número do contato"
            value={trustedContact}
            onChangeText={setTrustedContact}
          />

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Compartilhar localização</Text>
            <Switch
              value={shareLocation}
              onValueChange={setShareLocation}
              trackColor={{ false: "#ccc", true: "#4CAF50" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Gravar áudio</Text>
            <Switch
              value={recordAudio}
              onValueChange={setRecordAudio}
              trackColor={{ false: "#ccc", true: "#4CAF50" }}
              thumbColor="#fff"
            />
          </View>

          <Text style={styles.note}>
            Essas informações ficam salvas localmente e serão usadas sempre que
            o SOS for acionado.
          </Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveConfig}
            disabled={saving || loading}
          >
            <Text style={styles.saveButtonText}>
              {saving ? "Salvando..." : "Salvar configurações"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F8FAFC",
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  switchLabel: {
    fontSize: 15,
    color: "#334155",
    flex: 1,
    marginRight: 10,
  },
  note: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#0F172A",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});
