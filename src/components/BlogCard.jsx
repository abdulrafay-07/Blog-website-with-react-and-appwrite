import React from 'react';
import appwriteService from '../appwrite/config.js';
import { Link } from 'react-router-dom';

const BlogCard = ({$id, title, featuredImageID}) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full flex justify-center mb-4">
                    <img src={appwriteService.getFilePreview(featuredImageID)} alt={title} className="rounded-xl" />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    )
}

export default BlogCard;