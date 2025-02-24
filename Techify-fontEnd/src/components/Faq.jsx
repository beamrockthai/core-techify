import React, { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "จะหาข้อมูลการรับสมัครงานของ อบจ.นนทบุรี ได้จากที่ไหน?",
      answer:
        "คุณสามารถติดตามประกาศรับสมัครงานได้ที่เว็บไซต์ทางการของ อบจ.นนทบุรี ในส่วนของข่าวประชาสัมพันธ์",
    },
    {
      question: "ขั้นตอนการสมัครงานผ่านเว็บไซต์มีอะไรบ้าง?",
      answer: `ตรวจสอบประกาศรับสมัครงานที่สนใจ เเละ เตรียมเอกสารประกอบการสมัคร เช่น สำเนาบัตรประชาชน วุฒิการศึกษา และเอกสารอื่น ๆ ตามที่กำหนด`,
    },
    {
      question: "มีค่าธรรมเนียมในการสมัครงานหรือไม่?",
      answer:
        "ข้อมูลเกี่ยวกับค่าธรรมเนียม (ถ้ามี) ระบุไว้ในประกาศรับสมัครงาน ควรตรวจสอบรายละเอียดในแต่ละประกาศ",
    },
    {
      question: "จะทราบผลการสมัครงานได้อย่างไร?",
      answer:
        "อบจ.นนทบุรี จะประกาศรายชื่อผู้ผ่านคัดเลือกหรือสัมภาษณ์ผ่านเว็บไซต์ทางการขององค์กร",
    },
    {
      question: "หากมีข้อสงสัยเพิ่มเติม ควรติดต่อที่ไหน?",
      answer: `สามารถติดต่อสอบถามข้อมูลเพิ่มเติมได้ที่สำนักงาน อบจ.นนทบุรี หรือหมายเลขโทรศัพท์ที่ระบุในประกาศรับสมัครงาน 📞เบอร์โทรศัพท์ : 02-589-0481-5`,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-amber-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
