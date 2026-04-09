import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { z } from "zod";
import { useCreateProperty, useUpdateProperty } from "../../hooks/useProperties";


const itemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  quantity: z.coerce.number().min(0, "Must be ≥ 0"),
  price: z.coerce.number().optional(),
  category: z.string().optional(),
});

type FormData = z.infer<typeof itemSchema>;

export default function PropertyFormModal({
  open,
  item,
  onClose,
}: any) {
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(itemSchema),
  });

  // reset form when editing or opening
  useEffect(() => {
    if (item) {
      reset(item);
    } else {
      reset({
        name: "",
        description: "",
        quantity: undefined,
        price: undefined,
        category: "",
      });
    }
  }, [item, reset]);

  const onSubmit = async (data: FormData) => {
    if (item) {
      await updateProperty.mutateAsync({ id: item.id, data });
    } else {
      await createProperty.mutateAsync(data);
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in-95">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {item ? "Edit Property" : "Add Property"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Name */}
          <div>
            <input
              {...register("name")}
              placeholder="Property name"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full p-3 border rounded-xl h-24 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Quantity + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                {...register("quantity")}
                placeholder="Quantity"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="number"
                step="0.01"
                {...register("price")}
                placeholder="Price"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <input
              {...register("category")}
              placeholder="Category"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}