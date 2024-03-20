import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config.js';
import { Button, Container } from '../components/index.js';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

const Blog = () => {
    const [blog, setBlog] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = blog && userData ? blog.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getBlog(slug).then((blog) => {
                if (blog) {
                    setBlog(blog);
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate])

    const deleteBlog = () => {
        appwriteService.deleteBlog(blog.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(blog.featuredImageID);
                navigate('/');
            }
        });
    }

    return blog ? (
        <div className="py-16">
            <Container>
                <div className="flex flex-col">
                    <div className="mb-6 inline-flex justify-end w-1/2">
                        <h1 className="text-4xl font-bold mr-6">{blog.title}</h1>
                        {isAuthor && (
                            <div className="mt-1">
                                <Link to={`/edit-blog/${blog.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-4 px-6">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deleteBlog}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="w-full mb-6 flex justify-center"
                    >
                        <img
                            src={appwriteService.getFilePreview(blog.featuredImageID)}
                            alt={blog.title}
                            className="w-4/5 rounded-lg aspect-video object-cover border-2 border-black border-opacity-40"
                        />
                    </div>
                    <div className="flex justify-start ml-32 browser-css">
                        {parse(blog.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null
}

export default Blog;