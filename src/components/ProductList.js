import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Button, Table, Form } from "react-bootstrap";

const ProductList = () => {
    const { products, selectProduct } = useContext(ProductContext);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Form.Control
                type="text"
                placeholder="Search product..."
                className="mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Functions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => selectProduct(product.id)}
                                >
                                    View Details
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default ProductList;
