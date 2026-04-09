import { Trash2 } from "lucide-react";
import { useDeleteProperty } from "../../hooks/useProperties";

export default function DeleteConfirmModal({
  id,
  onClose,
}: any) {
  const deleteProperty = useDeleteProperty();

  if (!id) return null;

  const handleDelete = async () => {
    await deleteProperty.mutateAsync(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center animate-in fade-in zoom-in-95">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <Trash2 className="text-red-600" size={28} />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold mb-2">
          Delete Property?
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={deleteProperty.isPending}
            className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 transition"
          >
            {deleteProperty.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}