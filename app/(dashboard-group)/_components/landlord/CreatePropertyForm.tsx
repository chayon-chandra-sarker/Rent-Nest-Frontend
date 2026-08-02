"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  ArrowLeft,
  Image as ImageIcon,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import {
  createProperty,
  CreatePropertyData,
} from "@/service/property.service";

import {
  getAllCategories,
  Category,
} from "@/service/category.service";

const CreatePropertyForm = () => {
  // =========================
  // FORM STATE
  // =========================

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [amenityInput, setAmenityInput] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);

  // =========================
  // CATEGORY STATE
  // =========================

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const [loading, setLoading] = useState(false);

  // =========================
  // GET CATEGORIES
  // =========================

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoryLoading(true);

        const data = await getAllCategories();

        setCategories(data);
      } catch (error) {
        console.error("Fetch categories error:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load categories"
        );
      } finally {
        setCategoryLoading(false);
      }
    };

    loadCategories();
  }, []);

  // =========================
  // ADD AMENITY
  // =========================

  const addAmenity = () => {
    const value = amenityInput.trim();

    if (!value) return;

    const alreadyExists = amenities.some(
      (amenity) =>
        amenity.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) {
      toast.error("Amenity already added");
      return;
    }

    setAmenities((prev) => [...prev, value]);

    setAmenityInput("");
  };

  // =========================
  // REMOVE AMENITY
  // =========================

  const removeAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.filter((item) => item !== amenity)
    );
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) return;

    // Category validation
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    // Image validation
    if (!image.trim()) {
      toast.error("Please add a property image URL");
      return;
    }

    // Amenities validation
    if (amenities.length === 0) {
      toast.error("Please add at least one amenity");
      return;
    }

    // Number validation
    if (
      Number(price) <= 0 ||
      Number(bedrooms) < 0 ||
      Number(bathrooms) < 0
    ) {
      toast.error(
        "Please enter valid property information"
      );
      return;
    }

    try {
      setLoading(true);

      const payload: CreatePropertyData = {
        categoryId,
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        image: image.trim(),
        price: Number(price),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        amenities,
      };

      console.log(
        "Create property payload:",
        payload
      );

      await createProperty(payload);

      toast.success(
        "Property created successfully!"
      );

      // =========================
      // RESET FORM
      // =========================

      setTitle("");
      setDescription("");
      setLocation("");
      setImage("");
      setPrice("");
      setBedrooms("");
      setBathrooms("");
      setCategoryId("");
      setAmenities([]);
      setAmenityInput("");
    } catch (error) {
      console.error(
        "Create property error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create property"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-center gap-3">

        <Link
          href="/land-lord-dashboard/properties"
          className="flex size-10 items-center justify-center rounded-xl border border-border transition hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div>
          <p className="text-sm font-medium text-primary">
            Landlord Dashboard
          </p>

          <h1 className="text-2xl font-bold">
            Add Property
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Create a new rental property listing.
          </p>
        </div>

      </div>

      {/* =========================
          FORM
      ========================= */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border border-border/60 bg-card p-5 shadow-sm sm:p-7"
      >

        {/* =========================
            BASIC INFORMATION
        ========================= */}

        <div>
          <h2 className="text-lg font-bold">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Enter the basic details of your property.
          </p>
        </div>

        {/* =========================
            TITLE
        ========================= */}

        <div>
          <label
            htmlFor="property-title"
            className="mb-2 block text-sm font-semibold"
          >
            Property Title
          </label>

          <input
            id="property-title"
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Luxury Family Apartment"
            required
            disabled={loading}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* =========================
            DESCRIPTION
        ========================= */}

        <div>
          <label
            htmlFor="property-description"
            className="mb-2 block text-sm font-semibold"
          >
            Description
          </label>

          <textarea
            id="property-description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Describe your property..."
            rows={4}
            required
            disabled={loading}
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* =========================
            LOCATION
        ========================= */}

        <div>
          <label
            htmlFor="property-location"
            className="mb-2 block text-sm font-semibold"
          >
            Location
          </label>

          <input
            id="property-location"
            type="text"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            placeholder="Dhaka, Gulshan"
            required
            disabled={loading}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* =========================
            IMAGE URL
        ========================= */}

        <div>
          <label
            htmlFor="property-image"
            className="mb-2 flex items-center gap-2 text-sm font-semibold"
          >
            <ImageIcon className="size-4 text-primary" />
            Property Image URL
          </label>

          <input
            id="property-image"
            type="url"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            placeholder="https://example.com/property.jpg"
            required
            disabled={loading}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <p className="mt-1.5 text-xs text-muted-foreground">
            Add a publicly accessible image URL.
          </p>

          {/* IMAGE PREVIEW */}

          {image.trim() && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-border/60">
              <img
                src={image}
                alt="Property preview"
                className="h-48 w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* =========================
            CATEGORY
        ========================= */}

        <div>
          <label
            htmlFor="property-category"
            className="mb-2 block text-sm font-semibold"
          >
            Property Category
          </label>

          <select
            id="property-category"
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value)
            }
            required
            disabled={
              loading || categoryLoading
            }
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">
              {categoryLoading
                ? "Loading categories..."
                : "Select a category"}
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          {!categoryLoading &&
            categories.length === 0 && (
              <p className="mt-1.5 text-xs text-red-500">
                No categories available.
              </p>
            )}
        </div>

        {/* =========================
            NUMBERS
        ========================= */}

        <div className="grid gap-4 sm:grid-cols-3">

          {/* PRICE */}

          <div>
            <label
              htmlFor="property-price"
              className="mb-2 block text-sm font-semibold"
            >
              Monthly Rent
            </label>

            <input
              id="property-price"
              type="number"
              min="1"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              placeholder="25000"
              required
              disabled={loading}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* BEDROOMS */}

          <div>
            <label
              htmlFor="property-bedrooms"
              className="mb-2 block text-sm font-semibold"
            >
              Bedrooms
            </label>

            <input
              id="property-bedrooms"
              type="number"
              min="0"
              value={bedrooms}
              onChange={(e) =>
                setBedrooms(e.target.value)
              }
              placeholder="3"
              required
              disabled={loading}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* BATHROOMS */}

          <div>
            <label
              htmlFor="property-bathrooms"
              className="mb-2 block text-sm font-semibold"
            >
              Bathrooms
            </label>

            <input
              id="property-bathrooms"
              type="number"
              min="0"
              value={bathrooms}
              onChange={(e) =>
                setBathrooms(e.target.value)
              }
              placeholder="2"
              required
              disabled={loading}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

        </div>

        {/* =========================
            AMENITIES
        ========================= */}

        <div>

          <label className="mb-2 block text-sm font-semibold">
            Amenities
          </label>

          <div className="flex gap-2">

            <input
              type="text"
              value={amenityInput}
              onChange={(e) =>
                setAmenityInput(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addAmenity();
                }
              }}
              placeholder="WiFi"
              disabled={loading}
              className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <button
              type="button"
              onClick={addAmenity}
              disabled={
                loading ||
                !amenityInput.trim()
              }
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="size-4" />
              Add
            </button>

          </div>

          {amenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">

              {amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                >
                  {amenity}

                  <button
                    type="button"
                    onClick={() =>
                      removeAmenity(amenity)
                    }
                    disabled={loading}
                    aria-label={`Remove ${amenity}`}
                    className="transition hover:text-red-500 disabled:opacity-50"
                  >
                    <X className="size-3.5" />
                  </button>
                </span>
              ))}

            </div>
          )}

        </div>

        {/* =========================
            SUBMIT
        ========================= */}

        <div className="flex justify-end border-t border-border/60 pt-5">

          <button
            type="submit"
            disabled={
              loading ||
              categoryLoading ||
              categories.length === 0
            }
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="size-4" />
                Create Property
              </>
            )}

          </button>

        </div>

      </form>

    </section>
  );
};

export default CreatePropertyForm;