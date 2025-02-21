import React from "react";

const Banner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-lg relative border-t-4 border-gray-400">
      <div className="container mx-auto px-4 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-6 md:py-8">
        <div className="max-w-md text-left md:pl-2 lg:pl-4 xl:pl-0 2xl:pl-2 space-y-2">
          <h2 className="text-sm md:text-lg font-bold text-black">
            องค์การบริหารส่วนจังหวัดนนทบุรี
          </h2>
          <h3 className="text-xs md:text-sm font-semibold uppercase text-gray-800 opacity-90">
            NONTHABURI PROVINCIAL ADMINISTRATIVE ORGANIZATION
          </h3>
          <p className="mt-1 text-xs md:text-sm font-medium text-gray-900 opacity-80 leading-relaxed">
            องค์การบริหารส่วนจังหวัดนนทบุรี ถนนรัตนาธิเบศร์ 6 <br />
            ตำบลบางกระสอ อำเภอเมืองนนทบุรี จังหวัดนนทบุรี 11000
          </p>
          <div className="mt-3 text-xs md:text-sm text-gray-900 opacity-90 space-y-1">
            <p>📞 โทรศัพท์ : 02-589-0481-5</p>
            <p>📠 โทรสาร : 0-2591-6929</p>
            <p>
              📧 Email :{" "}
              <a
                href="mailto:admin@nont-pro.go.th"
                className="text-blue-700 font-semibold hover:underline"
              >
                admin@nont-pro.go.th
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* ✅ ตกแต่งรูปทรงเรขาคณิต */}
      <div className="absolute bottom-4 right-4 w-8 h-8 md:w-12 md:h-12 bg-purple-700 transform rotate-45 opacity-80"></div>
      <div className="absolute bottom-8 right-8 w-10 h-10 md:w-16 md:h-16 bg-purple-900 transform rotate-45 opacity-90"></div>
    </div>
  );
};

export default Banner;
