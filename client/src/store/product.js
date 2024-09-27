import { create } from "zustand";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8001";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  // Funzione per creare un prodotto
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
    
    try {
      const { data } = await axios.post("/api/products", newProduct);
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: "Failed to create product" };
    }
  },

  // Funzione per ottenere i prodotti
  fetchProducts: async () => {
    try {
      const { data } = await axios.get("/api/products");
      set({ products: data.data });
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  },

  // Funzione per eliminare un prodotto
  deleteProduct: async (pid) => {
    try {
      const { data } = await axios.delete(`/api/products/${pid}`);
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Failed to delete product" };
    }
  },

  // Funzione per aggiornare un prodotto
  updateProduct: async (pid, updatedProduct) => {
    try {
      const { data } = await axios.put(`/api/products/${pid}`, updatedProduct);
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Failed to update product" };
    }
  },
}));
