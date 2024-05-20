import { useUserContext } from "@/context/AuthContext";
import { useFollowUsers, useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite"
import { useState } from "react";

type FollowButtonProps = {
    currentUser: Models.Document,
    style?: string,
    showIcon?: boolean,
}

const FollowBtn = ({ currentUser, showIcon = true, style = '' }: FollowButtonProps) => {
    const { user } = useUserContext();
    const { data: userData } = useGetUserById(user.id || "");
    
    const [following, setFollowing] = useState(userData?.following || []);
    const isFollowing = following.includes(currentUser.$id);
    const { mutate: followUsers } = useFollowUsers();


    const currentStyle = style!== '' ? style : `profile-btn ${isFollowing ? 'bg-red-700 text-white' : ''}`

    const handleFollowClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        let updatedFollowingArray = [...following];

        if (isFollowing) {

            updatedFollowingArray = following.filter((userId: string) => userId !== currentUser.$id);

            setFollowing(updatedFollowingArray);
            followUsers({
                following: {
                    userId: user.id, 
                    updatedFollowingArray
                },
                followers: {
                    userId: currentUser.$id,
                    followers: currentUser.followers - 1 > 0 ? currentUser.followers - 1 : 0,
                }
            })
        } else {
            updatedFollowingArray.push(currentUser.$id);

            setFollowing(updatedFollowingArray);
            followUsers({
                following: {
                    userId: user.id, 
                    updatedFollowingArray
                },
                followers: {
                    userId: currentUser.$id,
                    followers: (currentUser.followers || 0) + 1,
                }
            })
        }
    }

  return (
    <div 
        className={currentStyle} 
        onClick={handleFollowClick}
    >
        {showIcon && <img 
            src="/assets/icons/follow.svg"
            alt='follow'
            width={16}
            height={16}
        />}
        <p className="flex whitespace-nowrap small-medium">
            {isFollowing ? 'Unfollow' : 'Follow'}
        </p>
    </div>
  )
}

export default FollowBtn