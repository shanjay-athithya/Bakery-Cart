import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <div
      className=" justify-center items-center mx-auto py-16 px-4 bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `url('/images/pattern.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-4xl font-semibold text-center font-script text-pgreen mb-2">
        Contact Us
      </h1>
      
        <ContactForm />
      
    </div>
  );
}
