import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUserProfile();

    // Reload user profile when screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserProfile();
    });

    return unsubscribe;
  }, [navigation]);

  const loadUserProfile = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đăng xuất',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('@token');
            await AsyncStorage.removeItem('@user');
            setUser(null);
            // Navigate back to Login and reset the stack
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } catch (error) {
            console.error('Error clearing auth during logout:', error);
          }
        },
      },
    ]);
  };

  const handleMenuPress = (menuName: string) => {
    switch (menuName) {
      case 'orders':
        Alert.alert('Đơn hàng của tôi', 'Bạn chưa có đơn hàng nào.');
        break;
      case 'wishlist':
        Alert.alert('Danh sách yêu thích', 'Danh sách yêu thích của bạn đang trống.');
        break;
      case 'address':
        Alert.alert('Địa chỉ giao hàng', user ? `Địa chỉ mặc định: 123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM` : 'Vui lòng đăng nhập để lưu địa chỉ.');
        break;
      case 'settings':
        Alert.alert('Cài đặt', 'Tính năng cài đặt hệ thống đang được phát triển.');
        break;
      default:
        break;
    }
  };

  // Get first letter of name for avatar
  const getAvatarLetter = () => {
    if (user?.fullName) {
      return user.fullName.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D4AF37' }} edges={['top']}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getAvatarLetter()}</Text>
          </View>
          <Text style={styles.userName}>{user?.fullName || 'Khách'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'Chưa đăng nhập'}</Text>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('orders')}>
            <Text style={styles.menuItemText}>Đơn hàng của tôi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('wishlist')}>
            <Text style={styles.menuItemText}>Danh sách yêu thích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('address')}>
            <Text style={styles.menuItemText}>Địa chỉ giao hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('settings')}>
            <Text style={styles.menuItemText}>Cài đặt</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <Text style={[styles.menuItemText, styles.logoutText]}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#D4AF37',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  menu: {
    padding: 20,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
    color: '#3D2010',
  },
  logoutItem: {
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  logoutText: {
    color: '#ff4444',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
