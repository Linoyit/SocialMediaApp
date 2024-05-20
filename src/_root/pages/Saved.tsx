import GridPostList from "@/components/shared/GridPostList"
import { useUserContext } from "@/context/AuthContext";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Saved = () => {
  const { user } = useUserContext();
  const { data: savedPosts } = useGetSavedPosts(user.id);

  const hasPosts = savedPosts?.documents.length === 0;
  const posts = savedPosts?.documents.map((item: Models.Document) => (item.post));

  return (
    <div className="saved-container">
  
      <div className="flex w-full gap-2 max-w-5xl">
          <img 
            src="/assets/icons/save.svg"
            width={36}
            height={36}
            alt="save"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left">Saved Posts</h2>
      </div>


      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {hasPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">
            No saved posts
          </p>
        ) : <GridPostList posts={posts || []} showStats={true}/>}
      </div>
    </div>
  )
}

export default Saved