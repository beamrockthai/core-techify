import React, { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I pay for my appointment?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet.",
    },
    {
      question:
        "Is the cost of the appointment covered by private health insurance?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?",
    },
    {
      question: "Do I need a referral?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet.",
    },
    {
      question: "What are your opening hours?",
      answer:
        "Our opening hours are Monday to Friday, from 9 AM to 6 PM. On Saturdays, we are open from 10 AM to 4 PM.",
    },
    {
      question: "What can I expect at my first consultation?",
      answer:
        "During your first consultation, our specialists will assess your condition and discuss the best treatment options available.",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container max-w-4xl px-6 py-10 mx-auto">
        <h1 className="text-2xl font-extrabold text-center text-gray-800 lg:text-3xl dark:text-white tracking-wide">
          FAQ
        </h1>

        <div className="mt-12 space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 rounded-lg dark:border-gray-700"
            >
              <button
                className="flex items-center justify-between w-full p-6"
                onClick={() => toggleFAQ(index)}
              >
                <h1 className="font-semibold text-gray-700 dark:text-white">
                  {faq.question}
                </h1>

                <span
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {openIndex === index ? (
                      <path d="M18 12H6" />
                    ) : (
                      <>
                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </>
                    )}
                  </svg>
                </span>
              </button>

              {openIndex === index && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <p className="p-6 text-sm text-gray-500 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
