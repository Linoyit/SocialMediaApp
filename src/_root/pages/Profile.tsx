import EditProfileBtn from "@/components/shared/EditProfileBtn";
import Filter from "@/components/shared/Filter";
import FollowBtn from "@/components/shared/FollowBtn";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useGetUserPosts } from "@/lib/react-query/queriesAndMutations";
import { Link, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";

const Stats = ({ value, label }: { value: number, label: string }) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
      <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
  )
}

const Profile = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const { data: currentUser } = useGetUserById(id || '');
  const { data: userPosts } = useGetUserPosts(id || '');

  if (!currentUser) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const showPosts = userPosts ? userPosts?.documents.length > 0 : false;

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="profile-details_container">
          <img 
            src={currentUser?.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />

          <div className="flex flex-col gap-2">
            <h1 className="profile-details_name">{currentUser?.name}</h1>
            <p className="profile-details_username">@{currentUser?.username}</p>

            <div className="profile-details_stats">
              <Stats value={currentUser?.posts.length} label={"Posts"} />
              <Stats value={currentUser?.followers || 0} label={"Followers"} />
              <Stats value={currentUser?.following.length || 0} label={"Following"} />
            </div>

            <p className="profile-details_bio">
              {currentUser?.bio || 'something about me i would like to share with you all'}
            </p>
          </div>

          {currentUser.$id === user.id ? 
            <EditProfileBtn currentUser={currentUser} /> 
            : <FollowBtn currentUser={currentUser} />
          }
          
        </div>
      </div>

      {user.id === currentUser.$id && (
        <div className="flex flex-between w-full max-w-5xl">
          <div className="flex max-w-5xl w-full">
            <Link to={`/profile/${id}`} className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}>
              <img
                src={"/assets/icons/posts.svg"}
                alt="posts"
                width={20}
                height={20}
              />
              Posts
            </Link>

            <Link to={`/profile/${id}/liked-posts`} className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}>
              <img
                src={"/assets/icons/like.svg"}
                alt="like"
                width={20}
                height={20}
              />
              Liked Posts
            </Link>
          </div>

          <Filter />
        </div>

      )}

      <Routes>
        <Route 
          index 
          element={showPosts ?
            <GridPostList 
              posts={userPosts?.documents || []} 
              showUser={false} 
              showStats={user.id !== currentUser.$id} 
            /> : <p className="w-full flex justify-center text-light-2">No Posts found</p>} 
        />
        {currentUser.$id === user.id && (
          <Route 
          path="/liked-posts" 
          element={
            <GridPostList 
              posts={currentUser.liked || []} 
              showUser={false} 
              showStats={false} 
            />} 
          />
        )}
      </Routes>

      <Outlet />
    </div>
  )
}

export default Profile