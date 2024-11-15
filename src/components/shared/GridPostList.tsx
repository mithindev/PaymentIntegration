import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { PostStats } from "@/components/shared";
import { useUserContext } from "@/context/AuthContext";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <li key={post.$id} className="bg-dark shadow-md rounded-lg overflow-hidden flex flex-col border border-white">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-gray-200 font-bold text-lg truncate">{post.title}</h3>
          </div>

          <Link to={`/articles/${post.$id}`} className="block h-64">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="p-4 flex justify-between items-center">
            {showUser && (
              <div className="flex items-center gap-2">
                <img
                  src={
                    "/assets/images/article.jpg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1 text-gray-600">@anonymous</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
