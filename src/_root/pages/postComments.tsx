// import { useUserContext } from "@/context/AuthContext";
// import { checkIsLiked } from "@/lib/utils";
// import { Models } from "appwrite"
// import React, { useState } from 'react'
// type postCommentsProps = {
//   comments: Models.Document[];
//   userId: string;
// }
// const postComments = ({ comments, userId }: postCommentsProps) => {
//     const { user } = useUserContext();
//     const [commentValue, setCommentValue] = useState('');

//     const handleLikeComment = (e: React.MouseEvent, comment: Models.Document) => {
//         e.stopPropagation();
//         let likesArray = [...comment.likes];

//         if (likesArray.includes(userId)) {
//             likesArray = likesArray.filter(id => id !== userId);
//         } else {
//             likesArray.push(userId);
//         }

//         // setLikes(likesArray);
//         // likeComment({ postId: post?.$id || '', likesArray })
//     };

//   return (
//     <div>
//         <div className="flex flex-1 flex-col gap-4 overflow-scroll">
//             {comments.map((comment: Models.Document, index: number) => (
//                 <div key={index} className="flex flex-between">
//                     <div className="flex flex-1">
//                         <img src={comment.user.imageUrl}/>
//                         <div className="flex flex-col">
//                             <div>{comment.user.username}</div>
//                             <div className="text-left text-wrap">{comment.content}</div>
//                         </div>
//                     </div>
//                     <div>
//                         <img
//                             src={checkIsLiked(comment.likes, userId)
//                                 ? "/assets/icons/liked.svg" 
//                                 : "/assets/icons/like.svg"}
//                             alt='like'
//                             width={20}
//                             height={20}
//                             onClick={e => handleLikeComment(e, comment)}
//                             className='cursor-pointer'
//                         />
//                         <p className='small-medium lg:base-medium'>{comment.likes.length}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>

//         <div className="flex justify-center items-center w-full max-h-8 gap-2 mt-2">
//               <img src={user.imageUrl} alt="profile" width={40} height={40} className="rounded-full"/>

//               <div className="flex flex-between w-full px-4 py-2 rounded-lg bg-dark-4">
//                 <input 
//                   type="text" 
//                   placeholder="Write your comment ..." 
//                   className="explore-search max-h-8" 
//                   value={commentValue} 
//                   onChange={(e) => setCommentValue(e.target.value)}
//                 />
//                 <img 
//                   src="/assets/icons/send.svg" 
//                   width={20} 
//                   height={20} 
//                   alt="send"
//                 />
//               </div>
//             </div>
//     </div>

//   )
// }

// export default postComments