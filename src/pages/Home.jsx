import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config.js';
import { Container, BlogCard } from '../components/index.js';

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        appwriteService.getBlogs().then((blogs) => {
            if (blogs) {
                setBlogs(blogs.documents);
            }
        })
    }, [])

    if (blogs.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">Login to read blogs.</h1>
                    </div>
                </Container>
            </div>
        )
    }

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

export default Home;