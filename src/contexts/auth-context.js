// context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Uygulama başladığında oturumu kontrol et
    const loadStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');
        
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
          // Token geçerliliğini kontrol etmek için profil bilgisini çekebiliriz
          try {
            const { data } = await authAPI.getProfile();
            setUser(data);
          } catch (error) {
            // Token geçersiz olabilir, kullanıcıyı çıkış yaptıralım
            await logout();
          }
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredUser();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await authAPI.login(email, password);
      
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      return data;
    } catch (error) {
      setError(error.response?.data?.message || 'Giriş yapılırken bir hata oluştu');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await authAPI.register(userData);
      
      // Bazı API'ler kayıt sonrası otomatik giriş yapabilir
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      
      return data;
    } catch (error) {
      setError(error.response?.data?.message || 'Kayıt olurken bir hata oluştu');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const { data } = await authAPI.updateProfile(userData);
      await AsyncStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      setError(error.response?.data?.message || 'Profil güncellenirken bir hata oluştu');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        login, 
        register, 
        logout,
        updateProfile,
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Kolay kullanım için bir hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
