import { signOut } from "next-auth/react"
 
export default function SignOutButton({className}) {
  return <button className={className} onClick={() => signOut({redirect:'/login'})}>Signout</button>
}