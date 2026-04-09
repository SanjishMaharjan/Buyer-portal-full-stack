import { useState } from "react";
import { useProperties } from "../hooks/useProperties";
import { useFavorites } from "../hooks/useFavorites";
import PropertyGrid from "./uiComponent/PropertyGrid";
import PropertyFormModal from "./uiComponent/PropertyFormModal";
import DeleteConfirmModal from "./uiComponent/DeleteConfirmModal";
import PrimaryButton from "./uiComponent/PrimaryButton";
import { Plus } from "lucide-react";

export default function BuyerDashboard() {
  const { data: items = [], isLoading } = useProperties();
  const { data: favorites = [] } = useFavorites();

  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
    <PrimaryButton className="mb-2" onClick={() => setShowForm(true)} icon={<Plus size={20} />}>Add Property</PrimaryButton>
      <PropertyGrid
        items={items?.data ?? []}
        favorites={new Set(favorites?.map((f) => f.id) ?? [])}
        onEdit={(i) => {
          setEditingItem(i);
          setShowForm(true);
        }}
        onDelete={(id) => setDeleteId(id)}
      />

      <PropertyFormModal
        open={showForm}
        item={editingItem}
        onClose={() => {
          setShowForm(false);
          setEditingItem(null);
        }}
      />

      <DeleteConfirmModal
        id={deleteId}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
}