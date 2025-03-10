import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ReviewForm from "./ReviewForm";
import { Card, ListGroup } from "react-bootstrap";

const ProductDetails = () => {
    const { selectedProduct } = useContext(ProductContext);

    if (!selectedProduct) return <p>Please select a product!</p>;

    return (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>{selectedProduct.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {selectedProduct.category} - ${selectedProduct.price}
                </Card.Subtitle>
                <h5>Reviews</h5>
                {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
                    <ListGroup>
                        {selectedProduct.reviews.map((review, index) => (
                            <ListGroup.Item key={index}>
                                <strong>{review.reviewerName}</strong>: {review.comment} (⭐ {review.rating})
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>No reviews yet.</p>
                )}

                <ReviewForm productId={selectedProduct.id} />
            </Card.Body>
        </Card>
    );
};

export default ProductDetails;
