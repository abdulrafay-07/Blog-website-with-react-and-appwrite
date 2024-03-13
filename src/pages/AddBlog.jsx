import React from 'react';
import { Container, BlogForm } from '../components/index.js';

const AddBlog = () => {
    return (
        <div className="py-8">
            <Container>
                <BlogForm />
            </Container>
        </div>
    )
}

export default AddBlog;