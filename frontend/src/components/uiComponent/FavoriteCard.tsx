import { Heart } from "lucide-react";

export interface Item {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  price?: number;
  category?: string;
}

interface Props {
  item: Item;
  onRemove: (id: string) => void;
}

export default function FavoriteCard({ item, onRemove }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold leading-tight">{item.name}</h3>
        <button
          onClick={() => onRemove(item.id)}
          className="ml-2 text-red-400 hover:text-red-600 transition-colors"
          title="Remove from favorites"
        >
          <Heart size={20} fill="currentColor" />
        </button>
      </div>

      {item.description && (
        <p className="text-gray-500 mt-2 text-sm line-clamp-2">{item.description}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">
          Qty: {item.quantity}
        </span>
        {item.price != null && (
          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium">
            ${item.price.toFixed(2)}
          </span>
        )}
        {item.category && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
            {item.category}
          </span>
        )}
      </div>
    </div>
  );
}