import ContactForm from "@/components/contact-form/contact-form";
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <title>Contact Me</title>
        <meta name="description" content="Contact Page for my blog" />
      </Head>
      <ContactForm />
    </>
  );
}
