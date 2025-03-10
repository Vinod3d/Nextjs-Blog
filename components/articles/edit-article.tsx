"use client";

import React, {
  FormEvent,
  startTransition,
  useActionState,
  useState,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "../ui/button";
import type { Article } from "@prisma/client";
import Image from "next/image";
import { editArticles } from "@/actions/edit-article";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type EditArticleProps = {
  article: Article;
};

const EditArticlesPage: React.FC<EditArticleProps> = ({ article }) => {
  const [content, setContent] = useState(article.content);
  const [formState, action, isPending] = useActionState(editArticles.bind(null, article.id), {
    errors: {},
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("content", content);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                name="title"
                defaultValue={article.title}
                placeholder="Title"
              />
              {formState.errors.title && (
                <span className="text-red-600 text-sm">
                  {formState.errors.title}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                className="flex h-10 w-full rounded-md"
                defaultValue={article.category}
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
              </select>
              {formState.errors.category && (
                <span className="text-red-600 text-sm">
                  {formState.errors.category}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="featuredImage">Featured Image</label>
              <Input
                type="file"
                id="featuredImage"
                name="featuredImage"
                accept="image/*"
              />
              <div className="mb-4 relative w-48 h-32">
                {article.featuredImage && (
                  <Image
                    src={article.featuredImage}
                    alt="Featured Image"
                    className="w-48 h-32 object-cover rounded-md"
                    fill
                  />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="content">Content</label>
              <ReactQuill
                id="content"
                theme="snow"
                value={content}
                onChange={setContent}
              />
              {formState.errors.content && (
                <span className="text-red-600 text-sm">
                  {formState.errors.content[0]}
                </span>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <Button type="submit" variant={"outline"}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Edit Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticlesPage;
