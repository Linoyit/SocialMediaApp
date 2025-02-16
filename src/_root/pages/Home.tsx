import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  const { data: creators, isPending: isCreatorsLoading } = useGetUsers(10);

  return (
    <div className='flex flex-1'>
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (<Loader />) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {
                posts?.documents.map((post: Models.Document) => (
                  <PostCard key={post.$id} post={post}/>
                ))
              }
            </ul>
          )}
        </div>

        <div className="home-creators">
          <h2 className="h3-bold text-light-1">Top Creators</h2>

          {isCreatorsLoading && !creators ? (<Loader />) : (
            <ul className="grid grid-cols-2 gap-6">
              {
              creators?.documents.map((creator: Models.Document) => (
                <li key={creator.$id} className="creator-card">
                  <UserCard user={creator} />
                </li>
              ))
              }
            </ul>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default Home