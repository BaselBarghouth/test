"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function placeOrderAction(formData) {
  try {
    
    return {
        success: true,
        orderId: "12312312",
    };
  } catch (error) {
    // redirect("/login?error=invalid credentials");
    return false
  }
}
