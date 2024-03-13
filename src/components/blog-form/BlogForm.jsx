import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index.js';
import appwriteService from "../../appwrite/config.js";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BlogForm = ({ blog }) => {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: blog?.title || "",
            slug: blog?.slug || "",
            content: blog?.content || "",
            status: blog?.status || "active",
        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.user.userData);

    const submit = async (data) => {
        if (blog) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(blog.featuredImageID);
            }

            const blogDB = await appwriteService.updateBlog(blog.$id, {...data, featuredImageID : file ? file.$id : undefined});

            if (blogDB) {
                navigate(`/blog/${blogDB.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImageID = fileId;

                const blogDB = await appwriteService.createBlog({...data, userId: userData.$id});

                if (blogDB) {
                    navigate(`/blog/${blogDB.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d]+/g, '-');
        }
        return "";
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title, {shouldValidate: true}));
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]) 

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !blog })}
                />
                {blog && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(blog.featuredImage)}
                            alt={blog.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={blog ? "bg-green-500" : undefined} className="w-full">
                    {blog ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default BlogForm;