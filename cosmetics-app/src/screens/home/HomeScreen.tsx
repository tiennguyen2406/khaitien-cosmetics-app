import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { productService, Product } from '../../services/product.service';

export default function HomeScreen({ navigation }: any) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const [featured, all] = await Promise.all([
        productService.getFeatured(),
        productService.getAll(),
      ]);
      setFeaturedProducts(featured);
      // Take last 3 products as "new" products
      setNewProducts(all.slice(-3));
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D4AF37' }} edges={['top']}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerTitle}>Xin chào!</Text>
        <Text style={styles.headerSubtitle}>Cosmetics App</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <TouchableOpacity 
                key={product._id} 
                style={styles.productCard}
                onPress={() => navigation.navigate('ProductDetail', { productId: product._id })}
              >
                <View style={styles.productImage}>
                  <Text style={styles.productImageText}>Ảnh</Text>
                </View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>Chưa có sản phẩm nổi bật</Text>
          )}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
        {newProducts.length > 0 ? (
          newProducts.map((product) => (
            <TouchableOpacity 
              key={product._id} 
              style={styles.productRow}
              onPress={() => navigation.navigate('ProductDetail', { productId: product._id })}
            >
              <View style={styles.productRowImage}>
                <Text style={styles.productImageText}>Ảnh</Text>
              </View>
              <View style={styles.productRowInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>Chưa có sản phẩm mới</Text>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    padding: 20,
  },
});
