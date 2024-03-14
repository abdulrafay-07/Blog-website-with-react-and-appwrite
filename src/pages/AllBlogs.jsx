import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config.js';
import { Container, BlogCard } from '../components/index.js';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        appwriteService.getBlogs([])
            .then((blogs) => {
                if (blogs) {
                    setBlogs(blogs.documents);
                }
            });
    }, [])

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {blogs.map((blog) => (
                        <div key={blog.$id} className="p-2 w-1/4">
                            <BlogCard {...blog} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllBlogs;