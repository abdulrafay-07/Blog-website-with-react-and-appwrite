import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config.js';
import { Container, BlogCard, Banner } from '../components/index.js';
import { useSelector } from 'react-redux';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const isAuthenticated = useSelector(state => state.auth.status);

    useEffect(() => {
        appwriteService.getBlogs().then((blogs) => {
            if (blogs) {
                setBlogs(blogs.documents);
            }
        })
    }, [])

    if (blogs.length === 0) {
        return (
            <div className="w-full py-8">
                {
                    isAuthenticated ? 
                        <Banner 
                            title="Welcome to Stock Blogs" 
                            desc="Start your blog today and join a community of writes and readers who are passionate about sharing their stories and ideas."
                        /> : null
                }
                <Container>
                    <div className="p-2 w-full flex items-center justify-center">
                        {
                            isAuthenticated ? <h1 className="text-2xl font-bold py-4 hover:text-gray-500">There are no blogs currently.</h1> : <h1 className="text-2xl font-bold py-4 hover:text-gray-500">Login to read blogs.</h1>
                        }
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            {
                isAuthenticated ? 
                    <Banner 
                        title="Welcome to Stock Blogs" 
                        desc="Start your blog today and join a community of writes and readers who are passionate about sharing their stories and ideas."
                    /> : null
            }
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

export default Home;