import { ProductProvider } from "./context/ProductContext";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
    <ProductProvider>
        <div className="container mt-4">
            <h1>Product List</h1>
            <div className="row">
                <div className="col-md-7">
                    <ProductList />
                </div>
                <div className="col-md-5">
                    <ProductDetails />
                </div>
            </div>
        </div>
    </ProductProvider>
);

export default App;
