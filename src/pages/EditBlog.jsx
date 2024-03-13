import React, { useState, useEffect } from 'react';
import { Container, BlogForm } from '../components/index.js';
import appwriteService from '../appwrite/config.js';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
    const [blog, setBlog] = useState([]);

    const navigate = useNavigate();
    const {slug} = useParams();

    useEffect(() => {
        if (slug) {
            appwriteService.getBlog(slug).then((blog) => {
                if (blog) {
                    setBlog(blog);
                }
            })
        } else {
            navigate('/');
        }
    }, [slug, navigate])

    return blog ? (
        <div className="py-8">
            <Container>
                <BlogForm blog={blog} />
            </Container>
        </div>
    ) : null
}

export default EditBlog;