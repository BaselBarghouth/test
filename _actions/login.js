import { signIn } from "next-auth/react";

export default async function logInAction(previousState, formData) {
  try {
    await signIn("credentials", {
      email:formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return true
  } catch (error) {
    console.log("error", error);
      return false
  }
}
