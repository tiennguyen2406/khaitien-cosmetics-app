import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = '@cart';

export const cartService = {
  getCart: async (): Promise<CartItem[]> => {
    try {
      const cartData = await AsyncStorage.getItem(CART_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  },

  addToCart: async (product: Product, quantity: number = 1): Promise<void> => {
    try {
      const cart = await cartService.getCart();
      const existingItem = cart.find(item => item.product._id === product._id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ product, quantity });
      }

      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  },

  removeFromCart: async (productId: string): Promise<void> => {
    try {
      const cart = await cartService.getCart();
      const updatedCart = cart.filter(item => item.product._id !== productId);
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  },

  updateQuantity: async (productId: string, quantity: number): Promise<void> => {
    try {
      const cart = await cartService.getCart();
      const item = cart.find(item => item.product._id === productId);

      if (item) {
        if (quantity <= 0) {
          await cartService.removeFromCart(productId);
        } else {
          item.quantity = quantity;
          await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  },

  clearCart: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(CART_KEY);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  },

  getTotal: async (): Promise<number> => {
    try {
      const cart = await cartService.getCart();
      return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    } catch (error) {
      console.error('Error getting total:', error);
      return 0;
    }
  },

  getItemCount: async (): Promise<number> => {
    try {
      const cart = await cartService.getCart();
      return cart.reduce((count, item) => count + item.quantity, 0);
    } catch (error) {
      console.error('Error getting item count:', error);
      return 0;
    }
  },
};
