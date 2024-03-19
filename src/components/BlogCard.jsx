import React from 'react';
import appwriteService from '../appwrite/config.js';
import { Link } from 'react-router-dom';

const BlogCard = ({$id, title, featuredImageID, name}) => {
    return (
        <Link to={`/blog/${$id}`}>
            <div className="flex justify-center">
                <img
                    src={appwriteService.getFilePreview(featuredImageID)} alt={title} 
                    className="w-full rounded-lg" 
                />
            </div>
            <h2 className="text-xl font-bold mt-4">Title: <span className="font-semibold">{title}</span></h2>
            <p className="text-base font-semibold mt-1">Author: {name}</p>
        </Link>
    )
}

export default BlogCard;