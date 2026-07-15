import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "./ContactForm";

export const ContactSection = async () => {
	return (
		<section
			id="contact"
			className="flex flex-col gap-4 sm:gap-6 w-full fade-in-up [animation-delay:240ms]"
		>
			<SectionHeading>Let&apos;s create something cool</SectionHeading>
			<ContactForm />
		</section>
	);
};
