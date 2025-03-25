import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { coursesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CourseDetailScreen = ({ route, navigation }) => {
  const { courseId } = route.params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const { data } = await coursesAPI.getCourseById(courseId);
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError('Kurs detayları yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigation.navigate('Login', { redirectTo: 'CourseDetail', params: { courseId } });
      return;
    }

    try {
      setEnrolling(true);
      await coursesAPI.enrollCourse(courseId);
      Alert.alert('Başarılı', 'Kursa başarıyla kaydoldunuz!');
      const { data } = await coursesAPI.getCourseById(courseId);
      setCourse(data);
    } catch (error) {
      console.error('Error enrolling to course:', error);
      Alert.alert('Hata', 'Kursa kaydolurken bir sorun oluştu.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0E7AFF" />
        <Text style={styles.loadingText}>Kurs yükleniyor...</Text>
      </View>
    );
  }

  if (error || !course) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle" size={50} color="#FF4842" />
        <Text style={styles.errorText}>{error || 'Kurs bulunamadı'}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isEnrolled = user && course.enrolledStudents?.includes(user.id);

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: course.coverImage || 'https://via.placeholder.com/600x300' }} 
        style={styles.bannerImage}
        resizeMode="cover"
      />
      
      <View style={styles.courseInfoContainer}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        
        <View style={styles.instructorRow}>
          <Image 
            source={{ uri: course.instructor.avatar || 'https://via.placeholder.com/40' }} 
            style={styles.instructorAvatar}
          />
          <Text style={styles.instructorName}>{course.instructor.name}</Text>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.statText}>{course.rating} ({course.reviewCount} değerlendirme)</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="account-group" size={16} color="#566A7F" />
            <Text style={styles.statText}>{course.studentCount} öğrenci</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="clock-outline" size={16} color="#566A7F" />
            <Text style={styles.statText}>{course.duration}</Text>
          </View>
        </View>
        
        <View style={styles.priceRow}>
          {course.price > 0 ? (
            <Text style={styles.priceText}>{course.price} ₺</Text>
          ) : (
            <Text style={styles.freeText}>Ücretsiz</Text>
          )}
        </View>
        
        <TouchableOpacity 
          style={[
            styles.enrollButton, 
            isEnrolled && styles.enrolledButton
          ]}
          onPress={handleEnroll}
          disabled={enrolling || isEnrolled}
        >
          {enrolling ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.enrollButtonText}>
              {isEnrolled ? 'Kursa Devam Et' : 'Kursa Kaydol'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Kurs Açıklaması</Text>
        <Text style={styles.descriptionText}>{course.description}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Neler Öğreneceksiniz</Text>
        {course.learningOutcomes?.map((outcome, index) => (
          <View key={index} style={styles.outcomeItem}>
            <Icon name="check-circle" size={20} color="#0E7AFF" />
            <Text style={styles.outcomeText}>{outcome}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Kurs İçeriği</Text>
        <Text style={styles.contentStats}>
          {course.totalModules || 0} modül • {course.totalLessons || 0} ders • {course.totalHours || 0} saat toplam
        </Text>

        {course.modules?.map((module, index) => (
          <View key={index} style={styles.moduleContainer}>
            <TouchableOpacity style={styles.moduleHeader}>
              <Text style={styles.moduleTitle}>{module.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Buraya stil kodlarını ekleyebilirsin
});

export default CourseDetailScreen;
