import React, { useState } from "react";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default redirect

    const form = e.target;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/mnnvyjyl", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setSubmitted(true);
      form.reset();
    } else {
      alert("❌ Something went wrong!");
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-xl shadow-sm">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
          {submitted && (
            <p className="text-green-600 text-center pt-4">
              ✅ Your message was sent!
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
