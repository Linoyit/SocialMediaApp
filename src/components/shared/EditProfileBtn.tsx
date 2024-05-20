import { Models } from "appwrite"
import { Link } from "react-router-dom"

const EditProfileBtn = ({ currentUser }: { currentUser: Models.Document }) => {

  return (
    <div className="mt-4">
    <Link 
      to={`/update-profile/${currentUser?.$id}`}
      className='profile-btn'
    >
      <img 
        src={"/assets/icons/edit.svg"}
        alt="edit"
        width={16}
        height={16}
      />
      <p className="flex whitespace-nowrap small-medium">
        Edit Profile
      </p>
    </Link>
  </div>
  )
}

export default EditProfileBtn