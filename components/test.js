import { signIn } from "next-auth/react";

export default async function Increment(previousState, formData) {
  const data = await signIn("credentials", {
    email: "test@test.com1",
    password: "Test321!@",
    callbackUrl: '/categories',
  });
console.log({data});
  if (data.error) {
    return false;
  }
  return true;
}
