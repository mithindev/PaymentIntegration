import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Textarea,
} from "@/components/ui";
import { PostValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { FileUploader, Loader } from "@/components/shared";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      title: post ? post?.title : "Title",
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "India",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // Query
  const { mutateAsync: createPost, isLoading: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isLoading: isLoadingUpdate } =
    useUpdatePost();

  // Handler
  const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
    // ACTION = UPDATE
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...value,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

      if (!updatedPost) {
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }
      return navigate(`/articles/${post.$id}`);
    }

    // ACTION = CREATE
    const newPost = await createPost({
      ...value,
      userId: user.id,
    });

    // console.log(user.id)

    if (newPost === "Article is unsafe, and may contain misinformation/hate speech.") {
      toast({
        title: `${action} post failed. Article is unsafe, and may contain misinformation/hate speech.`,
      });
    }

    else if (!newPost) {
      toast({
        title: `${action} post failed. Please try again.`,
      });
    }

    else {
      navigate("/");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-8 w-full max-w-5xl bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700"
      >
        <h1 className="text-2xl font-bold text-white mb-4">Write Your Article</h1>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label text-gray-300">Title...</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message text-red-500" />
            </FormItem>
          )}
        />
  
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label text-gray-300">What do you want to say...</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar h-48"
                  placeholder="Start writing your article here..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message text-red-500" />
            </FormItem>
          )}
        />
  
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label text-gray-300">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label text-gray-300">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message text-red-500" />
            </FormItem>
          )}
        />
  
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label text-gray-300">
                What is it about? (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message text-red-500" />
            </FormItem>
          )}
        />
  
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            Submit Article
          </Button>
        </div>
      </form>
    </Form>
  );
  
};

export default PostForm;
