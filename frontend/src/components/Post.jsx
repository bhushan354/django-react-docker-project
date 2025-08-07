import React from "react";


import { Card, Button } from "react-bootstrap";

function Post({ post, onDelete }) {
    return (
        <Card bg="dark" text="light" className="shadow border border-secondary">
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Button variant="outline-danger" onClick={() => onDelete(post.id)}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Post;
