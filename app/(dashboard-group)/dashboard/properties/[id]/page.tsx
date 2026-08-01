
import ReviewForm from "@/app/(dashboard-group)/_components/review/ReviewForm";
import RequestRentalButton from "@/app/(dashboard-group)/_components/tenant/RequestRentalButton";
import { getTenantProperties } from "@/service/property.service";
import {
  MapPin,
  BedDouble,
  Bath,
  Building2,
} from "lucide-react";

interface PropertyDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const PropertyDetailsPage = async ({
  params,
}: PropertyDetailsPageProps) => {
  const { id } = await params;

  const properties = await getTenantProperties();

  const property = properties.find(
    (item) => item.id === id,
  );

  if (!property) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Building2 className="mx-auto size-12 text-muted-foreground" />

          <h1 className="mt-4 text-xl font-bold">
            Property Not Found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            This property could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">

      <div>
        <p className="text-sm font-medium text-primary">
          Property Details
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          {property.title}
        </h1>

        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 text-primary" />
          {property.location}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
        {/* Image Area */}

        <div className="flex h-64 items-center justify-center bg-primary/5 sm:h-80">
          <Building2 className="size-24 text-primary/20" />
        </div>

        {/* Content */}

        <div className="space-y-6 p-6 sm:p-8">
     
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-3xl font-bold text-primary">
                ৳{Number(property.price).toLocaleString()}
              </span>

              <span className="ml-2 text-sm text-muted-foreground">
                / month
              </span>
            </div>

            <span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-500">
              Available
            </span>
          </div>

          <div>
            <h2 className="text-lg font-bold">
              About this property
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {property.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Bedrooms */}

            <div className="flex items-center gap-3 rounded-2xl border border-border/60 p-4">
              <BedDouble className="size-5 text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Bedrooms
                </p>

                <p className="font-semibold">
                  {property.bedrooms}
                </p>
              </div>
            </div>

            {/* Bathrooms */}

            <div className="flex items-center gap-3 rounded-2xl border border-border/60 p-4">
              <Bath className="size-5 text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Bathrooms
                </p>

                <p className="font-semibold">
                  {property.bathrooms}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold">
              Amenities
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-medium"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-border/60 pt-6">
            <h2 className="text-lg font-bold">
              Landlord
            </h2>

            <div className="mt-3 rounded-2xl border border-border/60 p-4">
              <p className="font-semibold">
                {property.landlord.name}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {property.landlord.email}
              </p>

              {property.landlord.phone && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {property.landlord.phone}
                </p>
              )}
            </div>
          </div>

          <RequestRentalButton
            propertyId={property.id}
          />
        </div>
      </div>

      <ReviewForm propertyId={property.id} />
    </section>
  );
};

export default PropertyDetailsPage;

