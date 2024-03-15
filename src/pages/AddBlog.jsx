import React from 'react';
import { Container, BlogForm } from '../components/index.js';

const AddBlog = () => {
    return (
        <div className="py-16">
            <Container>
                <BlogForm />
            </Container>
        </div>
    )
}

export default AddBlog;