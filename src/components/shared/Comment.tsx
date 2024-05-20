import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useLikeComment } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked, multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { useState } from "react";
import { Link } from "react-router-dom";

type CommentProps = {
    comment: Models.Document
}

const Comment = ({ comment } : CommentProps) => {
    const { user } = useUserContext();
    const { mutate: likeComment } = useLikeComment();
    const likesList = comment.likes.map((user: Models.Document) => user.$id);

    const [likes, setLikes] = useState(likesList);
    const { data: currentUser } = useGetUserById(comment.user.$id || '');

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        let likesArray = [...likes];

        if (likesArray.includes(user.id)) {
            likesArray = likesArray.filter(id => id !== user.id);
        } else {
            likesArray.push(user.id);
        }

        setLikes(likesArray);
        likeComment({ commentId: comment.$id, likesArray });
    }

  return (
    <div className="flex flex-1 flex-between items-center w-full">
        <div className="flex flex-1 items-center w-full">
            <Link
                to={`/profile/${currentUser?.$id}`}
                className=" flex flex-start cursor-pointer"
            >
                <img 
                    src={currentUser?.imageUrl ||  '/assets/icons/profile-placeholder.svg'}
                    alt="profile"
                    className="flex flex-1 min-w-9 rounded-full"
                    width={36}
                    height={36}
                />
                
            </Link>

            <div className="flex flex-col gap-1 px-2 overflow-scroll">
                    <div className="text-light-3 text-left base-regular lg:base-semibold">
                        {currentUser?.name}
                    </div>
                    <div className="overflow-scroll line-clamp-1">
                        {comment.content}
                    </div>

                    <p className=" text-light-3 subtle-semibold lg:small-regular">
                        {multiFormatDateString(comment?.$createdAt || '')}
                    </p>
            </div>
        </div>

        <div>
            <div className="flex gap-2">
                <img
                    src={checkIsLiked(likes, user.id) 
                        ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
                    alt='like'
                    width={20}
                    height={20}
                    onClick={handleClick}
                    className='cursor-pointer'
                />
                <p className='small-medium lg:base-medium'>{likes.length}</p>
            </div>
        </div>
       
    </div>
  )
}

export default Comment