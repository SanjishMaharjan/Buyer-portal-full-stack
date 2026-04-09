import { Heart, Trash2, Edit2 } from "lucide-react";
import { useToggleFavorite } from "../../hooks/useFavorites";
import { useState } from "react";

export default function PropertyCard({
  item,
  favorites,
  onEdit,
  onDelete,
}: any) {
  const toggleFav = useToggleFavorite();

  // 🔥 local optimistic state
  const [optimisticFav, setOptimisticFav] = useState(favorites.has(item.id));

  const handleToggleFavorite = async () => {
    // instant UI update
    setOptimisticFav((prev: boolean) => !prev);

    try {
      await toggleFav.mutateAsync(item.id);
    } catch (err) {
      // rollback if failed
      setOptimisticFav((prev: boolean) => !prev);
    }
  };

  return (
    <div className="group bg-white p-5 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-200">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800 leading-tight">
          {item.name}
        </h3>

        {/* Favorite */}
        <button
          onClick={handleToggleFavorite}
          className={`transition-all duration-200 ${
            optimisticFav
              ? "text-red-500 scale-110"
              : "text-gray-300 hover:text-red-400"
          }`}
        >
          <Heart
            size={20}
            fill={optimisticFav ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Description */}
      {item.description && (
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {item.description}
        </p>
      )}

      {/* Meta Info */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-lg font-medium">
          Qty: {item.quantity}
        </span>

        {item.price != null && (
          <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-lg font-medium">
            ${item.price.toFixed(2)}
          </span>
        )}

        {item.category && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">
            {item.category}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-5 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => onEdit(item)}
          className="flex-1 flex items-center justify-center gap-1 py-2 border rounded-lg text-sm hover:bg-gray-50 transition"
        >
          <Edit2 size={14} />
          Edit
        </button>

        <button
          onClick={() => onDelete(item.id)}
          className="flex-1 flex items-center justify-center gap-1 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 transition"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}