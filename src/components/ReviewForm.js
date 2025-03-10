import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const ReviewForm = ({ productId }) => {
    const { setSelectedProduct, selectProduct } = useContext(ProductContext); // Lấy cả hàm selectProduct từ context
    const [review, setReview] = useState({ reviewerName: "", comment: "", rating: 1 });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!review.reviewerName || !review.comment) {
            alert("All fields are required!");
            return;
        }
    
        try {
            // Lấy dữ liệu hiện tại của sản phẩm từ server
            const response = await axios.get(`http://localhost:9999/products/${productId}`);
            const updatedReviews = [...response.data.reviews, review];
    
            // Cập nhật đánh giá lên server
            await axios.patch(`http://localhost:9999/products/${productId}`, { reviews: updatedReviews });
    
            // Cập nhật ngay selectedProduct với đánh giá mới
            setSelectedProduct({ ...response.data, reviews: updatedReviews });
    
            // Hiển thị thông báo sau khi cập nhật xong
            alert("Review added successfully!");
    
            // Reset biểu mẫu sau khi gửi
            setReview({ reviewerName: "", comment: "", rating: 1 });
    
            // **Không gọi selectProduct để tránh ghi đè trạng thái**
        } catch (error) {
            console.error("Error adding review:", error);
            alert("Error submitting review. Please try again later.");
        }
    };
    

    useEffect(() => {
        // Reset review form whenever the productId changes
        setReview({ reviewerName: "", comment: "", rating: 1 });
    }, [productId]);

    return (
        <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group>
                <Form.Label>Reviewer Name</Form.Label>
                <Form.Control
                    type="text"
                    value={review.reviewerName}
                    onChange={(e) => setReview({ ...review, reviewerName: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    required
                />
            </Form.Group>
            <div>
                {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                        key={num}
                        onClick={() => setReview({ ...review, rating: num })}
                        className={review.rating === num ? "selected" : ""}
                        style={{
                            backgroundColor: review.rating === num ? "blue" : "white",
                            color: review.rating === num ? "white" : "black",
                            border: "1px solid gray",
                            margin: "0 5px",
                        }}
                    >
                        {num} ⭐
                    </Button>
                ))}
            </div>
            <Button type="submit" className="mt-2">Submit Review</Button>
        </Form>
    );
};

export default ReviewForm;
