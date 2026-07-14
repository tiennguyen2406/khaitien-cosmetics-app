import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function HomeScreen({ navigation }: any) {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('common.welcome')}</Text>
        <Text style={styles.headerSubtitle}>Cosmetics App</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('home.featuredProducts')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map((item) => (
            <TouchableOpacity 
              key={item} 
              style={styles.productCard}
              onPress={() => navigation.navigate('Products')}
            >
              <View style={styles.productImage}>
                <Text style={styles.productImageText}>Product {item}</Text>
              </View>
              <Text style={styles.productName}>Sản phẩm {item}</Text>
              <Text style={styles.productPrice}>$29.99</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('home.newArrivals')}</Text>
        {[1, 2, 3].map((item) => (
          <TouchableOpacity 
            key={item} 
            style={styles.productRow}
            onPress={() => navigation.navigate('Products')}
          >
            <View style={styles.productRowImage}>
              <Text style={styles.productImageText}>New {item}</Text>
            </View>
            <View style={styles.productRowInfo}>
              <Text style={styles.productName}>Sản phẩm mới {item}</Text>
              <Text style={styles.productPrice}>$39.99</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#D4AF37',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#3D2010',
  },
  productCard: {
    width: 150,
    marginRight: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    height: 150,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImageText: {
    color: '#999',
  },
  productName: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  productPrice: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  productRow: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  productRowImage: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productRowInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
});
