"use client";

import { Heart } from "lucide-react";
import { Button } from "@/_components/ui/button";
import { useCreateFavorite } from "@/_hooks/favorites/useCreateFavorite";
import { Animal } from "@/_schemas/animal.schema";
import { cn } from "@/_lib/cn";
import { useDeleteFavorite } from "@/_hooks/favorites/useDeleteFavorite";
import { useFavoritesQuery } from "@/_hooks/favorites/useFavoritesQuery";
import { useAuthStore } from "@/_stores/auth.store";
import { toast } from "sonner";

interface HandleFavoriteButtonProps {
  buttonClassName: string;
  iconClassName: string;
  animal: Animal;
}

export default function HandleFavoriteButton({ buttonClassName, iconClassName, animal }: HandleFavoriteButtonProps) {

  const addToFavorite = useCreateFavorite();
  const { isPending: isAddingToFavorite } = addToFavorite;
  const deleteFromFavorite = useDeleteFavorite();
  const { isPending: isDeletingFromFavorite } = deleteFromFavorite;
  const isPending = isAddingToFavorite || isDeletingFromFavorite;
  const { data: favorites } = useFavoritesQuery();
  const loggedUser = useAuthStore(state => state.loggedUser);


  const handleClick = () => {
    if (!loggedUser) {
      toast.error("Vous devez être connecté pour ajouter un favori !");
      return;
    }

    if (favorites?.some(fav => fav.id === animal.id)) {
      deleteFromFavorite.mutate(animal.id!);
    } else {
      addToFavorite.mutate(animal.id!);
    }
  };

  return (
    <Button
      size="icon"
      className={buttonClassName}
      onClick={handleClick}
      disabled={isPending}
    >
      <Heart className={cn(
        iconClassName,
        isPending ? "animate-pulse" : "",
        favorites?.some(fav => fav.id === animal.id) ? "fill-current text-red-500" : ""
      )}
      />
    </Button>
  )
}