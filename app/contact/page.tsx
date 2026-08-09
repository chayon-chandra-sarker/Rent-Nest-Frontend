import ContactFAQ from "@/components/Contact/ContactFAQ";
import ContactForm from "@/components/Contact/ContactForm";
import ContactHero from "@/components/Contact/ContactHero";
import SupportOptions from "@/components/Contact/SupportOptions";


const ContactPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <ContactHero></ContactHero>
      <ContactForm></ContactForm>
      <ContactFAQ></ContactFAQ>
      <SupportOptions></SupportOptions>
    </main>
  );
};

export default ContactPage;