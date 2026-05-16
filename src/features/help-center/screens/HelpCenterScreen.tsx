import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';

const HELP_OPTIONS = [
  'Ameaça', 'Assédio', 'Chantagem', 'Cyberbullying', 'Exposição', 'Ansiedade', 'Outro'
];

export default function HelpCenterScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [reportText, setReportText] = useState('');

  const handleSendReport = () => {
    Alert.alert(
      'Relato Enviado com Sucesso',
      'Seu relato anônimo foi registrado. Estamos direcionando você para canais de acolhimento seguros.',
      [{ text: 'Ver Canais de Apoio' }]
    );
    setSelectedOption(null);
    setReportText('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Central de Ajuda e Acolhimento</Text>
      <Text style={styles.subtitle}>
        Este é um ambiente seguro, preventivo e humanizado. Tudo que você relatar aqui pode ser feito de forma anônima.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>O que está acontecendo?</Text>
        <Text style={styles.cardSubtitle}>Selecione a situação (opcional):</Text>
        
        <View style={styles.tagsContainer}>
          {HELP_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.tag,
                selectedOption === option && styles.tagSelected
              ]}
              onPress={() => setSelectedOption(option)}
            >
              <Text style={[
                styles.tagText,
                selectedOption === option && styles.tagTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.cardSubtitle}>Deseja contar mais detalhes? (Anônimo e opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Descreva a situação..."
          multiline
          numberOfLines={4}
          value={reportText}
          onChangeText={setReportText}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSendReport}>
          <Text style={styles.submitButtonText}>Solicitar Ajuda Segura</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactsCard}>
        <Text style={styles.contactsTitle}>Canais Oficiais de Apoio</Text>
        <View style={styles.contactItem}>
          <Text style={styles.contactName}>Disque 100</Text>
          <Text style={styles.contactDesc}>Direitos Humanos</Text>
        </View>
        <View style={styles.contactItem}>
          <Text style={styles.contactName}>CVV - 188</Text>
          <Text style={styles.contactDesc}>Centro de Valorização da Vida</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 10,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  tagSelected: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  tagText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '500',
  },
  tagTextSelected: {
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
    minHeight: 100,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactsCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 20,
    width: '100%',
  },
  contactsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  contactItem: {
    marginBottom: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contactDesc: {
    fontSize: 14,
    color: '#666',
  },
});
