import { useState, useEffect } from "react";
import api from "../api";
import Post from "../components/Post";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Container, Row, Col } from "react-bootstrap";

function Home() {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        api
            .get("/api/posts/")
            .then((res) => res.data)
            .then((data) => setPosts(data))
            .catch((err) => alert(err));
    };

    const deletePost = (id) => {
        api
            .delete(`/api/posts/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Post deleted!");
                else alert("Failed to delete post.");
                getPosts();
            })
            .catch((error) => alert(error));
    };

    const createPost = (e) => {
        e.preventDefault();
        api
            .post("/api/posts/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Post created!");
                else alert("Failed to create post.");
                setContent("");
                setTitle("");
                getPosts();
            })
            .catch((err) => alert(err));
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <div
            className="min-vh-100 text-white"
            style={{
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
            }}
        >

            <Navbar className="bg-dark text-white px-4" variant="dark">
                <Navbar.Brand className="text-white">My Feed</Navbar.Brand>
                <Button className="ms-auto" variant="outline-light" onClick={handleLogout}>
                    Logout
                </Button>
            </Navbar>

            <Container className="py-4">

                <div className="card bg-dark text-white p-4 border-0" style={{ borderRadius: 0 }}>
                    <h3 className="mb-3">Create a Post</h3>
                    <form onSubmit={createPost}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control bg-dark text-white border-secondary rounded-0"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Content</label>
                            <textarea
                                id="content"
                                name="content"
                                className="form-control bg-dark text-white border-secondary rounded-0"
                                rows="4"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="btn btn-outline-light w-100 rounded-0">
                            Submit
                        </Button>
                    </form>
                </div>

                <Row className="mt-5 g-4">
                    {posts.map((post) => (
                        <Col md={6} key={post.id}>
                            <div className="card bg-dark text-white p-3 border-0 shadow-sm" style={{ borderRadius: 0 }}>
                                <Post post={post} onDelete={deletePost} />
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Home;
