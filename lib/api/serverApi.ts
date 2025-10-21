import { cookies } from "next/headers";
import { User } from "./api";
import { api } from "@/app/api/api";





export const getUser = async () => {
  const cookiStore = await cookies();

  const response = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookiStore.toString(),
    },
  });
  return response.data;
};