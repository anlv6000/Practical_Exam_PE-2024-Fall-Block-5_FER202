import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Lấy danh sách sản phẩm từ API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:9999/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error.message);
            }
        };

        fetchProducts();
    }, []);

    // Hàm chọn sản phẩm và cập nhật từ API
    const selectProduct = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:9999/products/${productId}`);
            setSelectedProduct(response.data); // Đồng bộ với dữ liệu từ API
        } catch (error) {
            console.error("Error fetching product details:", error.message);
        }
    };

    return (
        <ProductContext.Provider value={{ products, selectedProduct, setProducts, selectProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
