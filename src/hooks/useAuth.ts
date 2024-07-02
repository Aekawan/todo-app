import { UserContext, UserContextProps } from "@/context/UserContext";
import { useContext } from "react";

export const useAuth = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};