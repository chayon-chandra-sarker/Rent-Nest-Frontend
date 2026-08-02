"use client";

import { FormEvent, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  LandlordProperty,
  updateProperty,
} from "@/service/property.service";

interface EditPropertyFormProps {
  property: LandlordProperty;
}

const EditPropertyForm = ({
  property,
}: EditPropertyFormProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [categoryId, setCategoryId] = useState(
    property.categoryId
  );

  const [title, setTitle] = useState(
    property.title
  );

  const [description, setDescription] = useState(
    property.description
  );

  const [location, setLocation] = useState(
    property.location
  );

  const [price, setPrice] = useState(
    property.price
  );

  const [bedrooms, setBedrooms] = useState(
    String(property.bedrooms)
  );

  const [bathrooms, setBathrooms] = useState(
    String(property.bathrooms)
  );

  const [image, setImage] = useState(
    property.image || ""
  );

  const [isAvailable, setIsAvailable] = useState(
    property.isAvailable
  );

  const [amenities, setAmenities] = useState(
    property.amenities.join(", ")
  );

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!categoryId.trim()) {
      toast.error("Category ID is required");
      return;
    }

    if (!title.trim()) {
      toast.error("Property title is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!location.trim()) {
      toast.error("Location is required");
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    if (!bedrooms || Number(bedrooms) < 0) {
      toast.error("Please enter valid bedrooms");
      return;
    }

    if (!bathrooms || Number(bathrooms) < 0) {
      toast.error("Please enter valid bathrooms");
      return;
    }

    try {
      setLoading(true);

      const updatedProperty = await updateProperty(
        property.id,
        {
          categoryId: categoryId.trim(),
          title: title.trim(),
          description: description.trim(),
          location: location.trim(),
          price: Number(price),
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          amenities: amenities
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          image: image.trim() || null,
          isAvailable,
        }
      );

      console.log(
        "Updated property:",
        updatedProperty
      );

      toast.success(
        "Property updated successfully!"
      );

      router.push(
        "/land-lord-dashboard/properties"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Update property error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update property"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border/60 bg-card p-5 shadow-sm sm:p-8"
    >
      <div className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold"
          >
            Property Title
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Modern 2 Bedroom Apartment"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
            disabled={loading}
          />
        </div>

        {/* ================= CATEGORY ================= */}

        <div>
          <label
            htmlFor="categoryId"
            className="mb-2 block text-sm font-semibold"
          >
            Category ID
          </label>

          <input
            id="categoryId"
            type="text"
            value={categoryId}
            readOnly
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
            disabled={loading}
          />

          <p className="mt-1 text-xs text-muted-foreground">
            Current category:{" "}
            {property.category.name}
          </p>
        </div>

        {/* ================= DESCRIPTION ================= */}

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold"
          >
            Description
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            rows={5}
            placeholder="Describe your property..."
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
            disabled={loading}
          />
        </div>

        {/* ================= LOCATION ================= */}

        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-semibold"
          >
            Location
          </label>

          <input
            id="location"
            type="text"
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
            placeholder="Gulshan, Dhaka"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
            disabled={loading}
          />
        </div>

        {/* ================= PRICE ================= */}

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-semibold"
            >
              Monthly Rent
            </label>

            <input
              id="price"
              type="number"
              min="0"
              value={price}
              onChange={(event) =>
                setPrice(event.target.value)
              }
              placeholder="30000"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="bedrooms"
              className="mb-2 block text-sm font-semibold"
            >
              Bedrooms
            </label>

            <input
              id="bedrooms"
              type="number"
              min="0"
              value={bedrooms}
              onChange={(event) =>
                setBedrooms(event.target.value)
              }
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="bathrooms"
              className="mb-2 block text-sm font-semibold"
            >
              Bathrooms
            </label>

            <input
              id="bathrooms"
              type="number"
              min="0"
              value={bathrooms}
              onChange={(event) =>
                setBathrooms(event.target.value)
              }
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              disabled={loading}
            />
          </div>
        </div>

        {/* ================= AMENITIES ================= */}

        <div>
          <label
            htmlFor="amenities"
            className="mb-2 block text-sm font-semibold"
          >
            Amenities
          </label>

          <input
            id="amenities"
            type="text"
            value={amenities}
            onChange={(event) =>
              setAmenities(event.target.value)
            }
            placeholder="WiFi, Parking, Lift, Generator"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
            disabled={loading}
          />

          <p className="mt-1 text-xs text-muted-foreground">
            Separate amenities with commas.
          </p>
        </div>

        {/* ================= IMAGE ================= */}

        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-semibold"
          >
            Image URL
          </label>

          <input
            id="image"
            type="url"
            value={image}
            onChange={(event) =>
              setImage(event.target.value)
            }
            placeholder="https://example.com/property.jpg"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
            disabled={loading}
          />
        </div>

        {/* ================= AVAILABILITY ================= */}

        <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/20 p-4">
          <div>
            <p className="text-sm font-semibold">
              Property Availability
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Allow tenants to request this property.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={isAvailable}
            onClick={() =>
              setIsAvailable(!isAvailable)
            }
            disabled={loading}
            className={`relative h-6 w-11 rounded-full transition ${
              isAvailable
                ? "bg-primary"
                : "bg-muted"
            }`}
          >
            <span
              className={`absolute top-1 size-4 rounded-full bg-white transition ${
                isAvailable
                  ? "left-6"
                  : "left-1"
              }`}
            />
          </button>
        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex flex-col-reverse gap-3 border-t border-border/60 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() =>
              router.push(
                "/land-lord-dashboard/properties"
              )
            }
            disabled={loading}
            className="rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Update Property
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditPropertyForm;