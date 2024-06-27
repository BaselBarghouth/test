import { Button } from "@headlessui/react"
import { signOut } from "next-auth/react"
 
export default function SignOutButton() {
  return <Button onClick={() => signOut({redirect:'/login'})}>Signout</Button>
}