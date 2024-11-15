import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Textarea, Input, Button } from "@/components/ui";
import { Loader } from "@/components/shared";

import { RegesterFormValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useRegisterUser } from "@/lib/react-query/queries";

const registerUsertest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  const form = useForm<z.infer<typeof RegesterFormValidation>>({
    resolver: zodResolver(RegesterFormValidation),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  const { data: currentUser } = useGetUserById(id || "");
  const { mutateAsync: regesterUser, isLoading: isLoadingUpdate } = useRegisterUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
       Sorry user not found
      </div>
    );

  const handleUpdate = async (value: z.infer<typeof RegesterFormValidation>) => {
    const updatedUser = await regesterUser({
      userId: currentUser.$id,
      name: value.name,
      bio: value.bio,
      gender: value.gender,
    });

    if (!updatedUser) {
      toast({
        title: `Update user failed. Please try again.`,
      });
    }

    console.log(updatedUser)

    setUser({
      ...user,
      name: updatedUser?.name,
      bio: updatedUser?.bio,
    });
    return navigate("/");
  };

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-7 w-full mt-4 max-w-5xl">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            

            <div className="flex gap-4 items-center justify-end">
              <Button
                type="button"
                className="shad-button_dark_4"
                onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap"
                disabled={isLoadingUpdate}>
                {isLoadingUpdate && <Loader />}
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default registerUsertest;
