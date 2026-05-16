import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: 'Segurança em Redes Sociais',
    question: 'Uma pessoa que você conheceu online acabou de pedir para você enviar uma foto íntima e disse que confia em você. O que você faz?',
    options: [
      'Envio, pois não quero magoar a pessoa.',
      'Não envio, bloqueio a pessoa e converso com um adulto de confiança.',
      'Pergunto o motivo antes de decidir.'
    ],
    correctAnswer: 1,
    feedback: 'Excelente! Nunca compartilhe fotos íntimas. Pessoas mal-intencionadas usam isso para chantagem (sextorsão). Sempre bloqueie e peça ajuda.'
  }
];

export default function QuizScreen() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowFeedback(true);
  };

  const currentQuestion = QUIZ_QUESTIONS[0];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Quiz Consciente</Text>
      <Text style={styles.headerSubtitle}>Aprenda a se proteger no ambiente digital</Text>

      <View style={styles.card}>
        <Text style={styles.themeTag}>{currentQuestion.title}</Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            
            let optionStyle: any = styles.optionButton;
            if (showFeedback) {
              if (isCorrect) optionStyle = [styles.optionButton, styles.optionCorrect];
              else if (isSelected && !isCorrect) optionStyle = [styles.optionButton, styles.optionIncorrect];
            } else if (isSelected) {
              optionStyle = [styles.optionButton, styles.optionSelected];
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleOptionSelect(index)}
                disabled={showFeedback}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {showFeedback && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackTitle}>
              {selectedOption === currentQuestion.correctAnswer ? '🎉 Muito bem!' : '💡 Pense bem...'}
            </Text>
            <Text style={styles.feedbackText}>{currentQuestion.feedback}</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => { setSelectedOption(null); setShowFeedback(false); }}>
              <Text style={styles.nextButtonText}>Próxima Pergunta</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 20,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  themeTag: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 24,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
  },
  optionSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  optionCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  optionIncorrect: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  optionText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
  feedbackContainer: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
