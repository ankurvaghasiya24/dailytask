import React, { useEffect, useReducer, createContext } from 'react';


const UserContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

const PostContext = createContext();

const postReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_POSTS':
            return { ...state, posts: [...state.posts, ...action.payload] };
        case 'LIKE_POST':
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === action.payload ? { ...post, likes: post.likes + 1 } : post
                ),
            };
        case 'COMMENT_ON_POST':
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === action.payload.postId
                        ? { ...post, comments: [...post.comments, action.payload.comment] }
                        : post
                ),
            };
        default:
            return state;
    }
};

const SocialMediaFeed = () => {
    const [userState, userDispatch] = useReducer(userReducer, { user: { name: 'John Doe' } });
    const [postState, postDispatch] = useReducer(postReducer, { posts: [] });

    const fetchPosts = async () => {
        const newPosts = Array.from({ length: 10 }, (_, index) => ({
            id: index + postState.posts.length + 1,
            content: `Post content ${index + postState.posts.length + 1}`,
            likes: 0,
            comments: [],
        }));
        postDispatch({ type: 'ADD_POSTS', payload: newPosts });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
        if (bottom) {
            fetchPosts();
        }
    };

    const likePost = (id) => {
        postDispatch({ type: 'LIKE_POST', payload: id });
    };

    const commentOnPost = (id, comment) => {
        postDispatch({ type: 'COMMENT_ON_POST', payload: { postId: id, comment } });
    };

    return (
        <UserContext.Provider value={{ userState, userDispatch }}>
         <PostContext.Provider value={{ postState, postDispatch }}>
            <div className="container mt-4">
                <div className="overflow-auto" style={{ height: '80vh' }} onScroll={handleScroll} >
                    {postState.posts.map((post) => (
                        <div key={post.id} className="card mb-3">
                         <div className="card-body">
                            <p className="card-text">{post.content}</p>
                            <p className="card-text"><strong>Likes:</strong> {post.likes}</p>
                            <button className="btn btn-primary me-2" onClick={() => likePost(post.id)}>Like</button>
                            <div className="input-group mb-3 d-flex align-items-center ">
                            <h5>Comments:</h5>
                            <input type="text" className="form-control"placeholder="Add a comment"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                        commentOnPost(post.id, e.target.value);
                                        e.target.value = '';
                                        }
                                    }}/>
                            </div>
                            {post.comments.map((comment, index) => (
                            <p key={index} className="mb-1">{comment}</p>
                            ))}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </PostContext.Provider>
        </UserContext.Provider>
    );
};

export default SocialMediaFeed;
