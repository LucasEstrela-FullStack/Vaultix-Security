import React, { useState } from "react";
import {
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const DIGITAL_OPTIONS = [
  "Chantagem",
  "Cyberbullying",
  "Exposição / Vazamento",
  "Perfil Falso",
];
const FISICO_OPTIONS = ["Ameaça", "Assédio / Abuso", "Outro"];

export default function HelpCenterScreen() {
  const [isEmergency, setIsEmergency] = useState<boolean | null>(null);
  const [environment, setEnvironment] = useState<"digital" | "fisico" | null>(
    null,
  );

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [knowsRealLife, setKnowsRealLife] = useState<string | null>(null);
  const [isClosePerson, setIsClosePerson] = useState<string | null>(null);
  const [frequentsHouse, setFrequentsHouse] = useState<string | null>(null);
  const [userAge, setUserAge] = useState<"menor" | "maior" | null>(null);

  const [reportText, setReportText] = useState("");

  const handleCallEmergency = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleEnvironmentChange = (env: "digital" | "fisico") => {
    setEnvironment(env);
    setSelectedOption(null);
    setKnowsRealLife(null);
    setIsClosePerson(null);
    setFrequentsHouse(null);
  };

  const handleSendReport = () => {
    if (isEmergency === null) {
      Alert.alert(
        "Aviso",
        "Por favor, informe se você está em risco imediato agora.",
      );
      return;
    }
    if (isEmergency === false && !environment) {
      Alert.alert("Aviso", "Por favor, selecione onde a situação aconteceu.");
      return;
    }

    const payload = {
      urgencia_critica: isEmergency,
      ambiente: environment,
      categoria: selectedOption,
      vulnerabilidade_eca: userAge === "menor",
      metadados:
        environment === "digital"
          ? { conhece_vida_real: knowsRealLife }
          : { pessoa_proxima: isClosePerson, frequenta_casa: frequentsHouse },
      relato_texto: reportText,
    };

    console.log("Payload enviado para a fila de prioridade:", payload);

    Alert.alert(
      "Enviado com sucesso",
      "Estamos direcionando você para o acolhimento e serviços de apoio.",
      [{ text: "OK" }],
    );

    setIsEmergency(null);
    setEnvironment(null);
    setSelectedOption(null);
    setKnowsRealLife(null);
    setIsClosePerson(null);
    setFrequentsHouse(null);
    setUserAge(null);
    setReportText("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER MINIMALISTA */}
      <View style={styles.header}>
        <Text style={styles.title}>Tamo Junto</Text>
      </View>

      <Text style={styles.subtitle}>
        Este é um espaço seguro e confidencial. Responda apenas o que se sentir
        confortável.
      </Text>

      {/* PERGUNTA CRÍTICA: EMERGÊNCIA */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Você está em perigo agora?</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              isEmergency === true && styles.btnActiveDanger,
            ]}
            onPress={() => setIsEmergency(true)}
          >
            <Text
              style={[
                styles.buttonText,
                isEmergency === true && styles.textWhite,
              ]}
            >
              Sim, preciso de ajuda
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, isEmergency === false && styles.btnActive]}
            onPress={() => setIsEmergency(false)}
          >
            <Text
              style={[
                styles.buttonText,
                isEmergency === false && styles.textWhite,
              ]}
            >
              Não, estou seguro
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* RENDERIZAÇÃO DE EMERGÊNCIA */}
      {isEmergency === true && (
        <View style={styles.emergencyBox}>
          <Text style={styles.emergencyText}>
            Recomendamos o contato direto com as autoridades imediatas:
          </Text>
          <TouchableOpacity
            style={styles.emergencyCall}
            onPress={() => handleCallEmergency("190")}
          >
            <Text style={styles.emergencyCallText}>
              Ligar para Polícia (190)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.emergencyCall, { backgroundColor: "#475569" }]}
            onPress={() => handleCallEmergency("180")}
          >
            <Text style={styles.emergencyCallText}>
              Ligar Direitos Humanos (180)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.emergencyCall, { backgroundColor: "#1D4ED8" }]}
            onPress={() => handleCallEmergency("188")}
          >
            <Text style={styles.emergencyCallText}>Ligar CVV (188)</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* FLUXO COMPLETO SE NÃO FOR EMERGÊNCIA IMPRESCINDÍVEL */}
      {isEmergency === false && (
        <View>
          {/* ONDE ACONTECEU */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Onde a situação aconteceu?</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.button,
                  environment === "digital" && styles.btnActive,
                ]}
                onPress={() => handleEnvironmentChange("digital")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    environment === "digital" && styles.textWhite,
                  ]}
                >
                  Ambiente Digital
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  environment === "fisico" && styles.btnActive,
                ]}
                onPress={() => handleEnvironmentChange("fisico")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    environment === "fisico" && styles.textWhite,
                  ]}
                >
                  Ambiente Físico
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* FLUXO DIGITAL */}
          {environment === "digital" && (
            <View style={styles.subSection}>
              <Text style={styles.sectionTitle}>
                O que aconteceu na internet?
              </Text>
              <View style={styles.tagsContainer}>
                {DIGITAL_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.tag,
                      selectedOption === option && styles.tagActive,
                    ]}
                    onPress={() => setSelectedOption(option)}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        selectedOption === option && styles.textWhite,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.sectionTitle}>
                Você conhece o agressor na vida real?
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    knowsRealLife === "sim" && styles.btnActive,
                  ]}
                  onPress={() => setKnowsRealLife("sim")}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      knowsRealLife === "sim" && styles.textWhite,
                    ]}
                  >
                    Sim, conheço
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    knowsRealLife === "nao" && styles.btnActive,
                  ]}
                  onPress={() => setKnowsRealLife("nao")}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      knowsRealLife === "nao" && styles.textWhite,
                    ]}
                  >
                    Não, apenas online
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* FLUXO FÍSICO */}
          {environment === "fisico" && (
            <View style={styles.subSection}>
              <Text style={styles.sectionTitle}>
                O que aconteceu no espaço físico?
              </Text>
              <View style={styles.tagsContainer}>
                {FISICO_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.tag,
                      selectedOption === option && styles.tagActive,
                    ]}
                    onPress={() => setSelectedOption(option)}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        selectedOption === option && styles.textWhite,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.sectionTitle}>
                O agressor é uma pessoa próxima (família/amigos)?
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    isClosePerson === "sim" && styles.btnActive,
                  ]}
                  onPress={() => setIsClosePerson("sim")}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      isClosePerson === "sim" && styles.textWhite,
                    ]}
                  >
                    Sim
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    isClosePerson === "nao" && styles.btnActive,
                  ]}
                  onPress={() => setIsClosePerson("nao")}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      isClosePerson === "nao" && styles.textWhite,
                    ]}
                  >
                    Não
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.sectionTitle}>
                Esta pessoa costuma frequentar sua casa?
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    frequentsHouse === "sim" && styles.btnActive,
                  ]}
                  onPress={() => setFrequentsHouse("sim")}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      frequentsHouse === "sim" && styles.textWhite,
                    ]}
                  >
                    Sim
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    frequentsHouse === "nao" && styles.btnActive,
                  ]}
                  onPress={() => setFrequentsHouse("nao")}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      frequentsHouse === "nao" && styles.textWhite,
                    ]}
                  >
                    Não
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* FORMULÁRIO FINAL DE ENVIO */}
          {environment && (
            <View style={styles.subSection}>
              <Text style={styles.sectionTitle}>
                Qual sua idade? (Opcional)
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    userAge === "menor" && styles.btnActive,
                  ]}
                  onPress={() => setUserAge("menor")}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      userAge === "menor" && styles.textWhite,
                    ]}
                  >
                    Menor de 18 anos
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    userAge === "maior" && styles.btnActive,
                  ]}
                  onPress={() => setUserAge("maior")}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      userAge === "maior" && styles.textWhite,
                    ]}
                  >
                    18 anos ou mais
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.sectionTitle}>
                Quer nos contar mais detalhes?
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Escreva aqui o que aconteceu..."
                multiline
                numberOfLines={4}
                value={reportText}
                onChangeText={setReportText}
                textAlignVertical="top"
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSendReport}
              >
                <Text style={styles.submitButtonText}>Iniciar Acolhimento</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* CANAIS AUXILIARES */}
      <View style={styles.footerContacts}>
        <Text style={styles.footerTitle}>Canais de Apoio Permanentes</Text>
        <Text style={styles.footerText}>Disque 100 — Direitos Humanos</Text>
        <Text style={styles.footerText}>
          CVV 188 — Centro de Valorização da Vida
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 44,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#0F172A" },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 25,
  },
  section: { marginBottom: 20 },
  subSection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 10,
    marginTop: 12,
  },
  buttonRow: { flexDirection: "row", gap: 8 },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  buttonText: { fontSize: 14, color: "#475569", fontWeight: "500" },
  btnActive: { backgroundColor: "#0F172A", borderColor: "#0F172A" },
  btnActiveDanger: { backgroundColor: "#EF4444", borderColor: "#EF4444" },
  textWhite: { color: "#FFFFFF", fontWeight: "600" },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  tagText: { color: "#475569", fontSize: 13 },
  tagActive: { backgroundColor: "#0F172A", borderColor: "#0F172A" },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    backgroundColor: "#F8FAFC",
    minHeight: 90,
    marginTop: 5,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#0F172A",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  submitButtonText: { color: "#FFFFFF", fontWeight: "600", fontSize: 15 },
  emergencyBox: {
    backgroundColor: "#FEF2F2",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  emergencyText: {
    color: "#991B1B",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  emergencyCall: {
    backgroundColor: "#DC2626",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 4,
  },
  emergencyCallText: { color: "#FFFFFF", fontWeight: "600" },
  footerContacts: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 6,
  },
  footerText: { fontSize: 13, color: "#94A3B8", marginTop: 2 },
});
