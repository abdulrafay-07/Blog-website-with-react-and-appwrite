import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config.js';
import { Container, BlogCard, Banner } from '../components/index.js';

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

    if (blogs.length === 0) {
        return (
            <div className="w-full py-8">
                <Banner 
                    title="All Blogs" 
                    desc="Dive into captivating stories, insightful musings, and inspiring journeys - explore   our diverse collection of blogs, where every click leads to a world of discovery." 
                />
                <Container>
                    <div className="p-2 w-full flex items-center justify-center">
                        <h1 className="text-2xl font-bold py-4 hover:text-gray-500">There are no blogs currently.</h1>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Banner 
                title="All Blogs" 
                desc="Dive into captivating stories, insightful musings, and inspiring journeys - explore our diverse collection of blogs, where every click leads to a world of discovery." 
            />
            <Container>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog.$id} className="p-6 shadow-lg rounded-xl cursor-pointer bg-white">
                            <BlogCard {...blog} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllBlogs;