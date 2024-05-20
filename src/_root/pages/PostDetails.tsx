import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Comment from "@/components/shared/Comment";
import { useUserContext } from "@/context/AuthContext";
import { useCreateComment, useDeletePost, useGetPostById, useGetUserPosts } from "@/lib/react-query/queriesAndMutations"
import { multiFormatDateString } from "@/lib/utils";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Models } from "appwrite";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { data: post, isPending } = useGetPostById(id || '');
  const { data: userPosts, isPending: isLoadingUserPosts } = useGetUserPosts(post?.creator.$id || '');

  const { mutate: createComment } = useCreateComment();
  const [commentValue, setCommentValue] = useState('');
  const relatedPosts = userPosts?.documents.filter(post => post.$id !== id);

  // const hasComments = post?.comments.documents > 0;

  const {mutateAsync: deletePost, isPending: isDeletingPost } = useDeletePost();

  const handleNewComment = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (commentValue !== '' && post?.$id !== '') {
      createComment({ 
        userId: user.id, 
        postId: post?.$id || '',
        content: commentValue 
      });

      setCommentValue('');
    }
  }

  const handleDeletePost = async () => {
    const response = await deletePost({postId: post?.$id || '', imageId: post?.imageId});

    if (response?.status !== 'ok') {
      return toast({title: 'Failed to delete post. Please try again'})
    }

    navigate(-1);
  }

  return (
    <div className="post_details-container">
      {isPending ? <Loader /> 
      : <div className="post_details-card">

          <img 
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">

              <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">
                <img 
                    src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                    alt="creator"
                    className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />
            
                <div className="flex flex-col">
                    <p className="base-medium lg:body-bold text-light-1">{post?.creator.name}</p>
                    <div className="flex-center gap-2 text-light-3">
                        <p className="subtle-semibold lg:small-regular">{multiFormatDateString(post?.$createdAt || '')}</p>
                        -
                        <p className="subtle-semibold lg:small-regular">{post?.location}</p>
                    </div>
                </div>
              </Link>

              <div className="flex-center">
                <Link 
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  <img src='/assets/icons/edit.svg' width={24} height={24} alt="edit"/>
                </Link>

                <Button
                onClick={handleDeletePost}
                variant="ghost"
                className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  {isDeletingPost ? <Loader /> : 
                  <img src='/assets/icons/delete.svg' alt="delete" width={24} height={24} />}
                </Button>
              </div>
            </div>

            <hr  className="border w-full border-dark-4/80"/>

            <div className="flex w-full small-medium lg: base-regular">
                <p>{post?.caption}</p>
                <ul className="mx-2 flex gap-1">{post?.tags.map((tag: string) => (
                    <li key={tag} className="text-light-3">#{tag}</li>
                ))}</ul>
            </div>


            <div className="flex flex-1 flex-col gap-6 w-full max-h-52 overflow-scroll">
                {post?.comments.map((comment: Models.Document, index: number) => 
                  <div key={index} className="flex flex-1 w-full">
                    <Comment comment={comment} />
                  </div>
                )}
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id}/>
            </div>

            <div className="flex justify-center items-center w-full gap-2 mt-2">
              <img 
                src={user.imageUrl} 
                alt="profile" 
                width={40} 
                height={40} 
                className="rounded-full"
              />

              <div className="flex flex-between w-full px-4 py-2 rounded-lg bg-dark-4">
                <textarea 
                  placeholder="Write your comment ..." 
                  className="comment-input"
                  rows={1}
                  value={commentValue} 
                  onChange={e => setCommentValue(e.target.value)}
                />
                <img 
                  src="/assets/icons/send.svg" 
                  width={20} 
                  height={20} 
                  alt="send"
                  className="cursor-pointer"
                  onClick={handleNewComment}
                />
              </div>
            </div>
            
          </div>
        </div>
      }

      {relatedPosts && relatedPosts?.length > 0 && (
        <div className="w-full mwx-w-5xl">
          <hr className="border w-full border-dark-4/80" />

          <div>
            <h3 className="body-bold md:h3-bold text-left w-full my-10">
              More Related Posts
            </h3>

            {isLoadingUserPosts || !relatedPosts ? (<Loader />)
             : (<GridPostList 
                  posts={relatedPosts || []} 
                  showUser={false} 
                />)}
          </div>
        </div>
      )}

    </div>
  )
}

export default PostDetails