"use client";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { useGetCurrentUser } from "@/services/user/getCurrentUser";

export default function FavoriteHeader() {
  const { isAuthenticated } = useAuth();
  const { data: currentUser, isLoading: isLoadingUser } = useGetCurrentUser(
    isAuthenticated ?? false
  );

  return (
    <div className="flex justify-between border-b-2 border-neutral-200 pb-4 mb-4">
      <h2 className="text-xl font-bold">My Favorite Products</h2>
      <div className="text-right hidden md:block">
        {!currentUser && !isLoadingUser ? (
          <Spinner />
        ) : (
          <>
            <p className="text-lg font-medium">{currentUser?.email ?? null}</p>
            <Badge variant="success">
              {currentUser?.isverified ? "verified" : null}
            </Badge>
          </>
        )}
      </div>
    </div>
  );
}
