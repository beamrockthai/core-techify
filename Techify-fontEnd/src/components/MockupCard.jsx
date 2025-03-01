import React from "react";
import not6 from "../assets/not6.jpg";
import not7 from "../assets/not7.jpg";

const MockupCard = () => {
  return (
    <>
      <div>
        <section className="bg-gradient-to-b from-white via-purple-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div class="container px-6 py-10 mx-auto">
            <div class="text-center">
              <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                NONTHABURI PROVINCIAL ADMINISTRATIVE ORGANIZATION
              </h1>

              <p class="max-w-lg mx-auto mt-4 text-gray-500">
                <p>ข่าวสารโครงการ</p>
                {/* <p>📄 ติดตามสถานะการสมัคร ได้สะดวกและรวดเร็ว </p>
                <p>
                  🤝 ร่วมเป็นส่วนหนึ่งขององค์การบริหารส่วนจังหวัดนนทบุรี
                  และพัฒนาศักยภาพของคุณ{" "}
                </p> */}
              </p>
            </div>

            <div class="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
              <div>
                <img
                  className="relative z-10 object-cover w-full rounded-md h-96"
                  src={not7}
                  alt="Not Found"
                />

                <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                  <a
                    href="#"
                    class="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl"
                  >
                    องค์การบริหารส่วนจังหวัดนนทบุรี
                  </a>

                  <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                    องค์การบริหารส่วนจังหวัดนนทบุรี (อบจ. นนทบุรี)
                    ได้ดำเนินโครงการและกิจกรรมหลากหลายเพื่อพัฒนาคุณภาพชีวิต
                    และสิ่งแวดล้อมของประชาชนในพื้นที่
                    หนึ่งในโครงการที่น่าสนใจคือ "Green & Clean โรงเรียนสีเขียว
                    ปีที่ 6" ซึ่งจัดขึ้นระหว่างวันที่ 8-9 กุมภาพันธ์ 2568
                    ที่ศูนย์การค้าเซ็นทรัล เวสต์เกต
                    โครงการนี้มุ่งเน้นการสร้างจิตสำนึกด้านสิ่งแวดล้อมให้กับเยาวชน
                    โดยมีการจัดแสดงผลงาน นวัตกรรม
                    และความคิดสร้างสรรค์ของนักเรียนจากกว่า 80
                    โรงเรียนในจังหวัดนนทบุรี
                  </p>

                  <p class="mt-3 text-sm text-blue-500">8 กุมภาพันธ์ 2568</p>
                </div>
              </div>

              <div>
                <img
                  class="relative z-10 object-cover w-full rounded-md h-96"
                  src={not6}
                  alt=""
                />

                <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                  <a
                    href="#"
                    class="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl"
                  >
                    องค์การบริหารส่วนจังหวัดนนทบุรี
                  </a>

                  <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                    โครงการหลากหลายเพื่อพัฒนาคุณภาพชีวิตของประชาชน
                    หนึ่งในโครงการที่น่าสนใจคือ โครงการสงเคราะห์ผู้ป่วยที่ยากไร้
                    ซึ่งมีวัตถุประสงค์เพื่อช่วยเหลือผู้ป่วยที่ขาดแคลนทุนทรัพย์ในการรักษาพยาบาล
                    โดยการสนับสนุนค่าใช้จ่ายที่จำเป็น
                    เพื่อให้ผู้ป่วยเหล่านี้ได้รับการรักษาอย่างต่อเนื่องและมีคุณภาพชีวิตที่ดีขึ้น
                  </p>

                  <p class="mt-3 text-sm text-blue-500">9 กุมภาพันธ์ 2568</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MockupCard;
