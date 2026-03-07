
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

// Keep the native splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const CustomSplashScreen = ({ onFinish }) => {
  // Animation values
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    Animated.sequence([
      // Step 1: Logo appears with bounce
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),

      // Step 2: Title appears
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),

      // Step 3: Subtitle appears
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),

      // Step 4: Progress bar animation
      Animated.timing(progressWidth, {
        toValue: width * 0.7,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Hide splash screen and call onFinish after animations
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        if (onFinish) onFinish();
      }, 500);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6B4EFF" barStyle="light-content" />

      {/* Background with gradient effect */}
      <View style={styles.background}>
        <View style={styles.gradient1} />
        <View style={styles.gradient2} />
      </View>

      {/* Custom Image Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Image
          source={require('../assets/naridhanicon.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* App Title */}
      <Animated.View style={{ opacity: textOpacity }}>
        <Text style={styles.title}>NariDhan</Text>
        <Text style={styles.titlePro}>PRO</Text>
      </Animated.View>

      {/* Subtitle */}
      <Animated.View style={{ opacity: subtitleOpacity }}>
        <Text style={styles.subtitle}>Empowering Women Financially</Text>
      </Animated.View>

      {/* Loading Progress */}
      <Animated.View style={[styles.progressContainer, { width: progressWidth }]}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressWidth.interpolate({
                  inputRange: [0, width * 0.7],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.loadingText}>Loading your financial journey...</Text>
      </Animated.View>

      {/* Decorative Elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      <View style={styles.decorativeCircle3} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    transform: [{ scale: 1.5 }],
  },
  gradient2: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transform: [{ scale: 1.5 }],
  },
  logoContainer: {
    marginBottom: 20,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  titlePro: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFD700',
    textAlign: 'center',
    marginTop: -5,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 10,
    letterSpacing: 1,
  },
  progressContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 10,
    fontSize: 12,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: height * 0.1,
    left: width * 0.1,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: height * 0.15,
    right: width * 0.15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeCircle3: {
    position: 'absolute',
    top: height * 0.2,
    right: width * 0.2,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
  },
});

export default CustomSplashScreen;