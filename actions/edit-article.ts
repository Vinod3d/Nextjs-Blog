"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

 
const createArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string().min(10), 
});

type CreateArticleFormState = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
};

export const editArticles = async (
  articleId:string,
  prevState: CreateArticleFormState,
  formData: FormData
): Promise<CreateArticleFormState> => {
  
  const result = createArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"), 
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // ✅ Fix: Get Clerk User ID and check authentication
  const { userId } = await auth();

  if (!userId) {
    return {
      errors: {
        formErrors: ["You have to login first"],
      },
    };
  }


  const existingArticle = await prisma.article.findUnique({
    where: {id:articleId}
  })
  if(!existingArticle){
    return {
        errors: {
            formErrors: ["Article not found"],
        }
    }
  }

  // ✅ Fix: Find the actual user using `clerkUserId` and get their `id`
  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser || existingArticle.authorId !== existingUser.id) {
    return {
      errors: {
        formErrors: ["User not found. Please register before creating an article."],
      },
    };
  }

  let imageUrl = existingArticle.featuredImage;

  // ✅ Fix: Handle image upload properly
  const imageFile = formData.get("featuredImage") as File | null;
 
  if (imageFile && imageFile?.name !== "undefined") {
    try {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
    
      const uploadResult: UploadApiResponse | undefined = await new Promise(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            
            { 
                folder: "articles",
                resource_type: "auto" 
            }, // ✅ Fix: Ensure correct file type handling
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(buffer);
        }
      );

      if(uploadResult?.secure_url){
        imageUrl = uploadResult.secure_url
      } else{
        return {
          errors: {
            featuredImage:['failed to upload image']
          }
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        errors: {
          formErrors: ['Error uploading image. Please try again']
        }
      }
    }
  }




  





  try {
    await prisma.article.update({
        where: {id:articleId},
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["Some internal server error occurred."],
        },
      };
    }
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};