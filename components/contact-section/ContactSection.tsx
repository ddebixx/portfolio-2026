import { ContactForm } from "./ContactForm";

export const ContactSection = async () => {
    return (
        <section className="grid grid-cols-1 col-span-2 gap-6 items-start justify-center">
            <h2 className="text-base sm:text-lg font-commit-mono-bold font-mono">Let's create something cool</h2>
            <ContactForm />
        </section>
    );
};