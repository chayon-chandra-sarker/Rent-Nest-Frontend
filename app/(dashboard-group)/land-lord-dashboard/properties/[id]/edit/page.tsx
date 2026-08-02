import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  getSingleProperty,
} from "@/service/property.service";
import EditPropertyForm from "@/components/Dashboard/EditPropertyForm";


interface EditPropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditPropertyPage = async ({
  params,
}: EditPropertyPageProps) => {
  const { id } = await params;

  let property;

  try {
    property = await getSingleProperty(id);
  } catch (error) {
    console.error("Failed to load property:", error);

    return (
      <section className="space-y-6">
        <Link
          href="/land-lord-dashboard/properties"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Back to My Properties
        </Link>

        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10 text-center">
          <h1 className="text-xl font-bold text-red-500">
            Failed to Load Property
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Failed to load property"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      {/* Header */}

      <div>
        <Link
          href="/land-lord-dashboard/properties"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Back to My Properties
        </Link>

        <div className="mt-6">
          <p className="text-sm font-medium text-primary">
            Landlord Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Edit Property
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Update your property information below.
          </p>
        </div>
      </div>

      {/* Form */}

      <EditPropertyForm property={property} />
    </section>
  );
};

export default EditPropertyPage;