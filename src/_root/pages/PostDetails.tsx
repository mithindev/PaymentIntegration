import { useParams, Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui";
import { Loader } from "@/components/shared";
import { GridPostList, PostStats } from "@/components/shared";

import {
  useGetPostById,
  useGetUserPosts,
  useDeletePost,
} from "@/lib/react-query/queries";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(id);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  const { mutate: deletePost } = useDeletePost();

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  return (
    <div className="post_details-container">
      {/* <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3">
                <div className="flex gap-1 flex-col">
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-article/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}>
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}>
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )} */}

<div className="article-container max-w-5xl w-full mx-auto p-6 bg-dark-900 text-light-200 rounded-lg shadow-xl">
  <Button
    onClick={() => navigate(-1)}
    variant="ghost"
    className="shad-button_ghost mb-6 flex items-center text-light-400 hover:text-light-100">
    <img src={"/assets/icons/back.svg"} alt="back" width={24} height={24} />
    <p className="small-medium lg:base-medium ml-2">Back</p>
  </Button>

  {isLoading || !post ? (
    <Loader />
  ) : (
    <article className="article-card bg-dark-800 p-6 rounded-md shadow-md">
      <div className="article-header">
        <div className="article-meta flex justify-between items-center text-light-500">
          <div className="gap-4">
            <p className="date text-sm lg:text-base">
              {multiFormatDateString(post?.$createdAt)}
            </p>
            <p className="location text-sm lg:text-base">
              {post?.location}
            </p>
          </div>

          {user.id === post?.creator.$id && (
            <div className="article-actions flex gap-4">
              <Link to={`/update-article/${post?.$id}`} className="hover:text-light-100">
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={24}
                  height={24}
                />
              </Link>
              <Button
                onClick={handleDeletePost}
                variant="ghost"
                className="hover:text-light-100">
                <img
                  src={"/assets/icons/delete.svg"}
                  alt="delete"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          )}
        </div>

      </div>

      <hr className="my-6 border-light-700" />

      <section className="article-body">
        <h1 className="article-title text-3xl lg:text-4xl font-bold text-light-100 mb-4">
          {post?.title || "Untitled Article"}
        </h1>

        <p className="article-caption text-lg lg:text-xl leading-relaxed text-light-300 mb-6">
          {post?.caption}
        </p>

        <ul className="article-tags flex gap-2 mt-4 flex-wrap">
          {post?.tags.map((tag: string, index: string) => (
            <li
              key={`${tag}${index}`}
              className="tag text-sm lg:text-base bg-dark-600 text-light-400 p-2 rounded-md">
              #{tag}
            </li>
          ))}
        </ul>
      </section>

      <footer className="article-footer mt-8">
        <PostStats post={post} userId={user.id} />
      </footer>

      <hr className="my-6 border-light-700" />

      {/* <div className="article-image mt-6 flex justify-center">
        <img
          src={post?.imageUrl}
          alt="Article image"
          className="w-1/3 rounded-lg shadow-lg object-cover"
        />
      </div> */}
    </article>
  )}
</div>




      <div className="w-full max-w-5xl">
        <hr className="border w-full border-dark-4/80" />

        <h3 className="body-bold md:h3-bold w-full my-10">
          More Related Expriences
        </h3>
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default PostDetails;
