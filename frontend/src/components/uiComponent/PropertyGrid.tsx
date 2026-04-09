import PropertyCard from "./PropertyCard";

export default function PropertyGrid({ items, favorites, onEdit, onDelete }: any) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item: any) => (
        <PropertyCard
          key={item.id}
          item={item}
          favorites={favorites}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}