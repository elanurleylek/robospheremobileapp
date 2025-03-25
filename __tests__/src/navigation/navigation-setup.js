import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import CoursesScreen from '../screens/CoursesScreen';
import EventsScreen from '../screens/EventsScreen';
import BlogScreen from '../screens/BlogScreen';
import ShopScreen from '../screens/ShopScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigation
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0E7AFF',
        tabBarInactiveTintColor: '#566A7F',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Courses" 
        component={CoursesScreen} 
        options={{
          tabBarLabel: 'Kurslar',
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-open-page-variant" color={color} size={size} />
          ),
          headerTitle: 'Kurslar',
        }}
      />
      <Tab.Screen 
        name="Events" 
        component={EventsScreen} 
        options={{
          tabBarLabel: 'Etkinlikler',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
          headerTitle: 'Etkinlikler',
        }}
      />
      <Tab.Screen 
        name="Blog" 
        component={BlogScreen} 
        options={{
          tabBarLabel: 'Blog',
          tabBarIcon: ({ color, size }) => (
            <Icon name="post" color={color} size={size} />
          ),
          headerTitle: 'Blog',
        }}
      />
      <Tab.Screen 
        name="Shop" 
        component={ShopScreen} 
        options={{
          tabBarLabel: 'Mağaza',
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping" color={color} size={size} />
          ),
          headerTitle: 'Mağaza',
        }}
      />
    </Tab.Navigator>
  );
};

// Main navigation container
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CourseDetail" 
          component={CourseDetailScreen}
          options={{ headerTitle: 'Kurs Detayı' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ headerTitle: 'Profil' }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerTitle: 'Giriş Yap' }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ headerTitle: 'Kayıt Ol' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
