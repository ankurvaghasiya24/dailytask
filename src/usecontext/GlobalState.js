import React, { useState, createContext, useContext } from 'react';

const BlogContext = createContext();

export const useBlog = () => {
    return useContext(BlogContext);
};

export const BlogProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const createPost = (post) => {
        setPosts((prevPosts) => [...prevPosts, { ...post, id: Date.now() }]);
    };

    const updatePost = (id, updatedPost) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post))
        );
    };

    const deletePost = (id) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    };

    return (
        <BlogContext.Provider value={{ posts, createPost, updatePost, deletePost }}>
            {children}
        </BlogContext.Provider>
    );
};

const BlogForm = () => {
    const { createPost } = useBlog();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost({ title, content });
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <textarea 
                    className="form-control" 
                    placeholder="Content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Post</button>
        </form>
    );
};

const BlogList = () => {
    const { posts, deletePost } = useBlog();

    return (
        <div>
            <h2>Blog Posts</h2>
            {posts.map((post) => (
                <div key={post.id} className="card mb-3">
                    <div className="card-body">
                        <h3 className="card-title">{post.title}</h3>
                        <p className="card-text">{post.content}</p>
                        <button className="btn btn-danger" onClick={() => deletePost(post.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const App = () => {
    return (
        <BlogProvider>
            <div className="container mt-4">
                <h1 className="text-center">Blog Management System</h1>
                <BlogForm />
                <BlogList />
            </div>
        </BlogProvider>
    );
};

export default App;
