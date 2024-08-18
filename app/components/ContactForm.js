"use client";
import React from "react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const mailtoLink = `mailto:example@gmail.com?subject=${encodeURIComponent(
      "Sweet Shop Inquiry"
    )}&body=${encodeURIComponent(
      `Hello! My name is ${data.name} and I have a question about your sweet shop. You can email me at ${data.email} or reach out to me on ${data.phone}. Here is my message: ${data.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/pattern.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-pgreen bg-opacity-90 shadow-lg rounded-lg p-8 max-w-lg w-full space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center font-script text-byellow">Get in Touch</h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-byellow text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              {...register("name", { required: true, maxLength: 80 })}
              className={`w-full border border-byellow rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pastelYellow ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-byellow text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              {...register("email", { required: true })}
              className={`w-full border border-byellow rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pastelYellow ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-byellow text-sm font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Your Phone Number"
              {...register("phone", { required: true })}
              className={`w-full border border-byellow rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pastelYellow ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">Phone number is required</p>}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-byellow text-sm font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your Message"
              rows={4}
              {...register("message", { required: true })}
              className={`w-full border border-byellow rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pastelYellow ${
                errors.message ? "border-red-500" : ""
              }`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">Message is required</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-byellow text-pgreen py-2 px-4 rounded-lg font-semibold hover:bg-pastelMint transition-colors"
        >
          Send Inquiry
        </button>
      </form>
    </div>
  );
}
