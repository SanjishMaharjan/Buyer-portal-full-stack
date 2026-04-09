import { Heart } from "lucide-react";
import LoadingSpinner from "./uiComponent/LoadingSpinner";
import { useFavorites, useToggleFavorite } from "../hooks/useFavorites";
import FavoriteCard from "./uiComponent/FavoriteCard";


export default function FavoritesPage() {
  const { data: favorites, isLoading } = useFavorites();
  const removeFavorite = useToggleFavorite();
  console.log("Favorites data:", favorites, "Loading:", isLoading);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">My Favorites</h1>
        <p className="text-gray-500 mt-1">
          {favorites?.length || 0} saved item{(favorites?.length || 0) !== 1 ? "s" : ""}
        </p>
      </div>

      {favorites && favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <Heart size={48} className="mb-4 opacity-50" />
          <p className="text-xl font-medium">No favorites yet</p>
          <p className="text-sm mt-1">Heart items in your marketplace to save them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites?.map((item) => (
            <FavoriteCard
              key={item.id}
              item={item}
              onRemove={(id) => removeFavorite.mutate(id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}