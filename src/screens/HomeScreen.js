import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="account-circle" size={30} color="#0E7AFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.tagline}>Türkiye'nin En Kapsamlı Robotik Platformu</Text>
            <Text style={styles.heroTitle}>Robotik Dünyasını Keşfet</Text>
            <Text style={styles.subtitle}>
              Eğitim içerikleri, projeler, yarışmalar ve daha
              fazlası ile robotik alanında kendini geliştir.
            </Text>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => navigation.navigate('Courses')}
            >
              <Text style={styles.buttonText}>Ücretsiz Başla</Text>
              <Icon name="arrow-right" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Image 
            source={require('../assets/robot.png')} 
            style={styles.robotImage}
            resizeMode="contain"
          />
        </View>
        
        {/* Categories */}
        <View style={styles.categories}>
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => navigation.navigate('Courses')}
          >
            <Icon name="book-open-variant" size={24} color="#0E7AFF" />
            <Text style={styles.categoryText}>Kapsamlı Eğitim</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => navigation.navigate('Videos')}
          >
            <Icon name="video" size={24} color="#0E7AFF" />
            <Text style={styles.categoryText}>Video Dersler</Text>
          </TouchableOpacity>
        </View>
        
        {/* Beginner Projects Section */}
        <View style={styles.projectsSection}>
          <Text style={styles.sectionTitle}>Başlangıç Robotik Projelerinizi Keşfedin</Text>
          <Text style={styles.sectionSubtitle}>Arduino, Raspberry Pi ve daha fazlası</Text>
          
          {/* Project cards would be added here as a horizontal scroll */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.projectsScroll}>
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} style={styles.projectCard}>
                <Image 
                  source={require('../assets/project-placeholder.png')} 
                  style={styles.projectImage}
                />
                <Text style={styles.projectTitle}>Arduino LED Projesi</Text>
                <Text style={styles.projectDesc}>Başlangıç seviyesi proje</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Featured Courses */}
        <View style={styles.coursesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popüler Kurslar</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          
          {/* Course cards */}
          {[1, 2].map((item) => (
            <TouchableOpacity key={item} style={styles.courseCard}>
              <Image 
                source={require('../assets/course-placeholder.png')} 
                style={styles.courseImage}
              />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>Temel Robotik Eğitimi</Text>
                <Text style={styles.courseInstructor}>Instructor Name</Text>
                <View style={styles.courseStats}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>4.8</Text>
                  <Text style={styles.studentsText}>(250+ öğrenci)</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      {/* Bottom Tab Navigation would be handled by React Navigation */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: {
    width: 150,
    height: 40,
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f7f9ff',
  },
  bannerContent: {
    flex: 1,
    paddingRight: 8,
  },
  tagline: {
    backgroundColor: '#e6f0ff',
    color: '#0E7AFF',
    padding: 6,
    borderRadius: 16,
    fontSize: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A1929',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#566A7F',
    marginBottom: 16,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: '#0E7AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 8,
  },
  robotImage: {
    width: 140,
    height: 140,
  },
  categories: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-around',
  },
  categoryItem: {
    alignItems: 'center',
    backgroundColor: '#f5f8ff',
    padding: 16,
    borderRadius: 8,
    width: '45%',
  },
  categoryText: {
    marginTop: 8,
    fontWeight: '600',
    color: '#333',
  },
  projectsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A1929',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#566A7F',
    marginBottom: 16,
  },
  projectsScroll: {
    marginTop: 12,
  },
  projectCard: {
    width: 200,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  projectImage: {
    width: '100%',
    height: 120,
  },
  projectTitle: {
    padding: 8,
    paddingBottom: 0,
    fontWeight: '600',
  },
  projectDesc: {
    padding: 8,
    paddingTop: 4,
    fontSize: 12,
    color: '#566A7F',
  },
  coursesSection: {
    padding: 16,
    paddingTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#0E7AFF',
    fontWeight: '600',
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  courseImage: {
    width: 100,
    height: 100,
  },
  courseInfo: {
    flex: 1,
    padding: 12,
  },
  courseTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 12,
    color: '#566A7F',
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    fontSize: 12,
  },
  studentsText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#566A7F',
  },
});

export default HomeScreen;