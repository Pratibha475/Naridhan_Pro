
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';

const LearningModules = ({ language = 'en' }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);

  const isHindi = language === 'hi';

  const modules = [
    {
      id: '1',
      title: isHindi ? 'निवेश की मूल बातें' : 'Basics of Investing',
      description: isHindi ? 'निवेश के मूल सिद्धांत सीखें' : 'Learn the fundamentals of investing',
      icon: 'trending-up',
      color: '#6B4EFF',
      lessons: [
        { id: '1-1', title: isHindi ? 'निवेश क्या है?' : 'What is Investing?', duration: '5 min' },
        { id: '1-2', title: isHindi ? 'निवेश के प्रकार' : 'Types of Investments', duration: '8 min' },
        { id: '1-3', title: isHindi ? 'जोखिम और रिटर्न' : 'Risk and Returns', duration: '6 min' },
      ],
    },
    {
      id: '2',
      title: isHindi ? 'बजट बनाना' : 'Budgeting 101',
      description: isHindi ? 'बजट बनाने की कला सीखें' : 'Master the art of budgeting',
      icon: 'wallet',
      color: '#4ECDC4',
      lessons: [
        { id: '2-1', title: isHindi ? 'बजट क्यों?' : 'Why Budget?', duration: '4 min' },
        { id: '2-2', title: isHindi ? 'पहला बजट बनाना' : 'Creating Your First Budget', duration: '7 min' },
        { id: '2-3', title: isHindi ? 'खर्च ट्रैक करना' : 'Tracking Expenses', duration: '5 min' },
      ],
    },
    {
      id: '3',
      title: isHindi ? 'बचत रणनीतियाँ' : 'Saving Strategies',
      description: isHindi ? 'पैसे बचाने के स्मार्ट तरीके' : 'Smart ways to save money',
      icon: 'save',
      color: '#FFD700',
      lessons: [
        { id: '3-1', title: isHindi ? 'बचत लक्ष्य' : 'Savings Goals', duration: '5 min' },
        { id: '3-2', title: isHindi ? 'स्वचालित बचत' : 'Automated Savings', duration: '4 min' },
        { id: '3-3', title: isHindi ? 'खर्च कम करना' : 'Cutting Expenses', duration: '6 min' },
      ],
    },
  ];

  const quizQuestions = {
    '1': [
      {
        question: isHindi ? 'निवेश का मुख्य लक्ष्य क्या है?' : 'What is the main goal of investing?',
        options: [isHindi ? 'पैसा खर्च करना' : 'To spend money', isHindi ? 'धन बढ़ाना' : 'To grow wealth', isHindi ? 'पैसा खोना' : 'To lose money'],
        correct: 1
      },
      {
        question: isHindi ? 'कम जोखिम वाला निवेश कौन सा है?' : 'Which is a low-risk investment?',
        options: [isHindi ? 'शेयर' : 'Stocks', isHindi ? 'फिक्स्ड डिपॉजिट' : 'Fixed Deposits', isHindi ? 'क्रिप्टोकरेंसी' : 'Cryptocurrency'],
        correct: 1
      },
    ],
  };

  const handleLessonPress = (moduleId, lessonId) => {
    if (!completedLessons.includes(`${moduleId}-${lessonId}`)) {
      setCompletedLessons([...completedLessons, `${moduleId}-${lessonId}`]);
    }
  };

  const startQuiz = (moduleId) => {
    setSelectedModule(moduleId);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setShowQuiz(true);
  };

  const handleAnswer = (selectedIndex) => {
    const questions = quizQuestions[selectedModule] || [];
    const isCorrect = selectedIndex === questions[currentQuestion]?.correct;

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {modules.map((module) => {
        const progress = module.lessons.filter(lesson =>
          completedLessons.includes(`${module.id}-${lesson.id}`)
        ).length;
        const progressPercentage = (progress / module.lessons.length) * 100;

        return (
          <Card key={module.id} style={styles.moduleCard}>
            <View style={styles.moduleHeader}>
              <View style={[styles.moduleIcon, { backgroundColor: module.color + '20' }]}>
                <Ionicons name={module.icon} size={30} color={module.color} />
              </View>
              <View style={styles.moduleInfo}>
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleDescription}>{module.description}</Text>
              </View>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>
                  {isHindi ? 'प्रगति' : 'Progress'}: {progress}/{module.lessons.length}
                </Text>
                <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
              </View>
              <ProgressBar progress={progressPercentage} color={module.color} />
            </View>

            {module.lessons.map((lesson) => {
              const isCompleted = completedLessons.includes(`${module.id}-${lesson.id}`);
              return (
                <TouchableOpacity
                  key={lesson.id}
                  style={[styles.lessonItem, isCompleted && styles.lessonCompleted]}
                  onPress={() => handleLessonPress(module.id, lesson.id)}
                >
                  <View style={styles.lessonLeft}>
                    <Ionicons
                      name={isCompleted ? 'checkmark-circle' : 'play-circle'}
                      size={24}
                      color={isCompleted ? '#4CAF50' : module.color}
                    />
                    <View>
                      <Text style={[styles.lessonTitle, isCompleted && styles.completedText]}>
                        {lesson.title}
                      </Text>
                      <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

            <Button
              title={isHindi ? 'क्विज लें' : 'Take Quiz'}
              onPress={() => startQuiz(module.id)}
              style={styles.quizButton}
            />
          </Card>
        );
      })}

      {/* Quiz Modal */}
      <Modal visible={showQuiz} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {!showResult ? (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {isHindi ? 'क्विज' : 'Quiz'}
                  </Text>
                  <TouchableOpacity onPress={() => setShowQuiz(false)}>
                    <Ionicons name="close" size={24} color="#212121" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.questionNumber}>
                  {isHindi ? 'प्रश्न' : 'Question'} {currentQuestion + 1}/{quizQuestions[selectedModule]?.length || 0}
                </Text>

                <Text style={styles.questionText}>
                  {quizQuestions[selectedModule]?.[currentQuestion]?.question}
                </Text>

                <View style={styles.optionsContainer}>
                  {quizQuestions[selectedModule]?.[currentQuestion]?.options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionButton}
                      onPress={() => handleAnswer(index)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : (
              <View style={styles.resultContainer}>
                <Ionicons
                  name={score >= 2 ? 'trophy' : 'sad-outline'}
                  size={60}
                  color={score >= 2 ? '#FFD700' : '#757575'}
                />
                <Text style={styles.resultTitle}>
                  {score >= 2 ? (isHindi ? 'बधाई हो!' : 'Congratulations!') : (isHindi ? 'कोशिश करते रहें' : 'Keep Trying!')}
                </Text>
                <Text style={styles.resultScore}>
                  {isHindi ? 'आपका स्कोर' : 'Your Score'}: {score}/{quizQuestions[selectedModule]?.length || 0}
                </Text>
                <Button
                  title={isHindi ? 'बंद करें' : 'Close'}
                  onPress={() => setShowQuiz(false)}
                  style={styles.closeButton}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  moduleCard: {
    marginBottom: 15,
    padding: 15,
  },
  moduleHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  moduleIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  moduleDescription: {
    fontSize: 13,
    color: '#757575',
    marginTop: 2,
  },
  progressSection: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressLabel: {
    fontSize: 13,
    color: '#757575',
  },
  progressPercentage: {
    fontSize: 13,
    fontWeight: '600',
    color: '#212121',
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lessonCompleted: {
    opacity: 0.7,
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lessonTitle: {
    fontSize: 14,
    color: '#212121',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#757575',
  },
  lessonDuration: {
    fontSize: 11,
    color: '#757575',
    marginTop: 2,
  },
  quizButton: {
    marginTop: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  questionNumber: {
    fontSize: 14,
    color: '#6B4EFF',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    color: '#212121',
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#212121',
  },
  resultContainer: {
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 15,
    marginBottom: 10,
  },
  resultScore: {
    fontSize: 18,
    color: '#6B4EFF',
    marginBottom: 20,
  },
  closeButton: {
    width: '100%',
  },
});

export default LearningModules;