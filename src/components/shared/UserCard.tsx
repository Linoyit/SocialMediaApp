import { Link } from "react-router-dom";
import { Models } from "appwrite"
import FollowBtn from "./FollowBtn";

type UserCardProps = {
    user: Models.Document;
}

const UserCard = ({ user }: UserCardProps) => {

  return (
    <Link to={`profile/${user.$id}`} className="user-card">
        <img 
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} 
            className="rounded-full w-14 h-14"
            alt="creator"
        />

        <div className="flex-center flex-col gap-1">
            <p className="base-medium text-light-1 text-center line-clamp-1">{user.name}</p>
            <p className="small-regular text-light-3 text-center line-clamp-1">@{user.username}</p>
        </div>
        
        <FollowBtn 
            currentUser={user} 
            showIcon={false} 
            style="shad-button_primary px-5 py-2 rounded-md"
        />
    </Link>
  )
}

export default UserCard