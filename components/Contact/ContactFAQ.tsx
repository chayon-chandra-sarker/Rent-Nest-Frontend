
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How can I find a property on RentNest?",
    answer:
      "You can browse available properties from the Properties page and use location, category, price, and availability filters to find a suitable property.",
  },
  {
    question: "Can I send a rental request through RentNest?",
    answer:
      "Yes. After finding a suitable property, you can view its details and send a rental request to the landlord.",
  },
  {
    question: "Can landlords list their properties?",
    answer:
      "Yes. Landlords can add and manage their properties through their landlord dashboard.",
  },
  {
    question: "How can I contact a landlord?",
    answer:
      "You can explore the property details and follow the available rental request process to communicate your interest in the property.",
  },
  {
    question: "Is RentNest available for different property types?",
    answer:
      "Yes. RentNest supports different categories such as homes, villas, apartments, parking spaces, and other rental properties.",
  },
];

const ContactFAQ = () => {
  return (
    <section className="border-t border-border/60 bg-muted/30 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <HelpCircle className="size-4" />
            Frequently Asked Questions
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Questions? We have{" "}
            <span className="text-primary">answers.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Find quick answers to some of the most common questions
            about RentNest.
          </p>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-border/60 bg-card transition-all duration-300 open:border-primary/30 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>

                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-open:rotate-180">
                  <ChevronDown className="size-4" />
                </span>
              </summary>

              <div className="px-5 pb-5">
                <p className="border-t border-border/60 pt-4 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;

