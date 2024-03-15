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
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(blog.featuredImageID)}
                        alt={blog.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-blog/${blog.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deleteBlog}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{blog.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(blog.content)}
                </div>
            </Container>
        </div>
    ) : null
}

export default Blog;