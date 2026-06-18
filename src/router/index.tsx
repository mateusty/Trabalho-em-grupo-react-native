import { useAuth } from "../context/AuthContext";
import { StackRouter } from "./stack";
import { DrawerRouter } from "./drawer";

export const Routers = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; 
  }

  return (
    <>
      {user ? (
        <DrawerRouter />
      ) : (
        <StackRouter />
      )}
    </>
  );
};