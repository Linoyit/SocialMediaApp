 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ProfileValidation } from "@/lib/validation"
import { useUserContext } from "@/context/AuthContext"
import { toast } from "../ui/use-toast"
import { useNavigate, useParams } from "react-router-dom"
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queriesAndMutations"
import ProfileUploader from "../shared/ProfileUploader"
import { Textarea } from "../ui/textarea"
import Loader from "../shared/Loader"

const ProfileForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, setUser } = useUserContext();

    const form = useForm<z.infer<typeof ProfileValidation>>({
      resolver: zodResolver(ProfileValidation),
      defaultValues: {
          file: [],
          name: user.name,
          username: user.username,
          email: user.email,
          bio: user?.bio || '',
      },
  })
  
    const { data: currentUser } = useGetUserById(id || "");
    const {mutateAsync: updateUser, isPending: isLoadingUpdate } = useUpdateUser();

    if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

    
    async function handleUpdate(values: z.infer<typeof ProfileValidation>) {

      if (user) {
        const updatedUser = await updateUser({
          userId: currentUser?.$id || '',
          name: values.name,
          bio: values.bio,
          file: values.file,
          imageId: currentUser?.imageId || '',
          imageUrl: currentUser?.imageUrl || '',
        })

        if (!updatedUser) {
          return toast({title: 'Please try again'})
        }

        setUser({
            ...user,
            name: updatedUser?.name,
            bio: updatedUser?.bio,
            imageUrl: updatedUser?.imageUrl,
        });

        return navigate(`/profile/${user.id}`);
      }
    }

  return (
    <Form {...form}>
    <form 
      onSubmit={form.handleSubmit(handleUpdate)} 
      className="flex flex-col gap-9 w-full max-w-5xl"
    >

    <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormControl>
                <ProfileUploader 
                    fieldChange={field.onChange}
                    mediaUrl={user.imageUrl}
                />
            </FormControl>
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
        />
        
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Name</FormLabel>
            <FormControl>
            <Input type="text" className="shad-input" {...field}/>
            </FormControl>
            <FormMessage className="shad-form_message"/>
          </FormItem>
        )}
      />

        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
            <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message"/>
            </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
            <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                <Input type="text" className="shad-input" {...field}/>
                </FormControl>
                <FormMessage className="shad-form_message"/>
            </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
            <FormItem>
                <FormLabel className="shad-form_label">Bio</FormLabel>
                <FormControl>
                  <Textarea
                        className="shad-textarea custom-scrollbar"
                        {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message"/>
            </FormItem>
            )}
        />
        


        <div className="flex gap-4 items-center justify-end">
            <Button 
                type="button" 
                className="shad-button_dark_4">
                    Cancel
            </Button>
            <Button 
              type="submit" 
              className="shad-button_primary whitespace-nowrap"
              disabled={isLoadingUpdate}
              >
                {isLoadingUpdate && 'Loading...'}
                Update Profile
            </Button>
        </div>
    </form>
  </Form>
  )
}

export default ProfileForm