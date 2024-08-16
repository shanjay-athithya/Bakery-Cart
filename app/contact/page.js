import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-semibold text-center text-pastelPink">Contact Us</h1>
      <div className="mt-12">
        <ContactForm />
      </div>
    </div>
  );
}
