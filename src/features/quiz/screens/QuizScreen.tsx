import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ARTICLES, QUIZ_QUESTIONS_BY_ARTICLE } from "../data/articles";

export default function QuizScreen() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<any[]>(
    QUIZ_QUESTIONS_BY_ARTICLE[ARTICLES[0].id],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [articleModalVisible, setArticleModalVisible] = useState(false);
  const [activeArticle, setActiveArticle] = useState(ARTICLES[0]);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowFeedback(true);
  };

  const openArticle = (article: any) => {
    setActiveArticle(article);
    setArticleModalVisible(true);
  };

  const startQuizForArticle = (articleId: string) => {
    const questions = QUIZ_QUESTIONS_BY_ARTICLE[articleId] ?? [];
    setCurrentQuestions(questions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setArticleModalVisible(false);
  };

  const currentQuestion = currentQuestions[currentIndex];

  const handleNext = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // finished
      setCurrentIndex(0);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Educação — Artigos & Quiz</Text>
      <Text style={styles.headerSubtitle}>
        Leia os artigos e teste seu conhecimento
      </Text>

      <View style={{ width: "100%", marginBottom: 16 }}>
        {ARTICLES.map((article) => (
          <TouchableOpacity
            key={article.id}
            style={styles.articleCard}
            onPress={() => openArticle(article)}
          >
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleExcerpt}>{article.excerpt}</Text>
            <Text style={styles.readMore}>Ler artigo →</Text>
          </TouchableOpacity>
        ))}
      </View>

      {currentQuestion && (
        <View style={styles.card}>
          <Text style={styles.themeTag}>{currentQuestion.title}</Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option: string, index: number) => {
              const isSelected = selectedOption === index;
              const isCorrect = index === currentQuestion.correctAnswer;

              let optionStyle: any = styles.optionButton;
              if (showFeedback) {
                if (isCorrect)
                  optionStyle = [styles.optionButton, styles.optionCorrect];
                else if (isSelected && !isCorrect)
                  optionStyle = [styles.optionButton, styles.optionIncorrect];
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
                  {(() => {
                    let prefix = "";
                    if (showFeedback) {
                      if (isCorrect) prefix = "✅ ";
                      else if (isSelected && !isCorrect) prefix = "❌ ";
                    }
                    return (
                      <Text style={styles.optionText}>{prefix + option}</Text>
                    );
                  })()}
                </TouchableOpacity>
              );
            })}
          </View>

          {showFeedback && (
            <View style={styles.feedbackOverlay} pointerEvents="box-none">
              <View style={styles.feedbackBox}>
                <Text style={styles.feedbackTitle}>
                  {selectedOption === currentQuestion.correctAnswer
                    ? "🎉 Muito bem!"
                    : "💡 Pense bem..."}
                </Text>
                <Text style={styles.feedbackText}>
                  {currentQuestion.feedback}
                </Text>
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleNext}
                  activeOpacity={0.9}
                >
                  <Text style={styles.nextButtonText}>
                    {currentIndex < currentQuestions.length - 1
                      ? "Próxima Pergunta"
                      : "Reiniciar"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}

      <Modal visible={articleModalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.headerTitle}>{activeArticle.title}</Text>
          <Text style={{ marginBottom: 20 }}>{activeArticle.content}</Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => startQuizForArticle(activeArticle.id)}
          >
            <Text style={styles.nextButtonText}>Fazer Quiz deste artigo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.nextButton,
              { marginTop: 12, backgroundColor: "#E2E8F0" },
            ]}
            onPress={() => setArticleModalVisible(false)}
          >
            <Text style={[styles.nextButtonText, { color: "#0F172A" }]}>
              Voltar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {/* feedback handled via overlay inside the card */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F0F4F8",
    padding: 20,
    paddingTop: 44,
    position: "relative",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginTop: 20,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    paddingBottom: 32,
    position: "relative",
  },
  themeTag: {
    backgroundColor: "#DBEAFE",
    color: "#1E40AF",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 24,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
  },
  optionSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  optionCorrect: {
    borderColor: "#34D399",
    backgroundColor: "#F0FFF4",
  },
  optionIncorrect: {
    borderColor: "#FCA5A5",
    backgroundColor: "#FFF7F7",
  },
  optionText: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 22,
  },
  feedbackContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  feedbackOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.18)",
    zIndex: 40,
    padding: 20,
  },
  feedbackBox: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#1E3A8A",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: 8,
    zIndex: 2,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  // removed floating button styles; feedback now uses centered overlay
});
