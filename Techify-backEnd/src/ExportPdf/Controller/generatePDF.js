const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const logoURL = "http://localhost:3000/LogoNew.png"; // โลโก้หน่วยงาน

const generatePDF = async (data) => {
  try {
    // ✅ ตรวจสอบโฟลเดอร์ `uploads/`
    const uploadDir = path.resolve(__dirname, "../../../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log("📂 โฟลเดอร์ uploads ถูกสร้างขึ้นแล้ว!");
    }

    console.log(
      "📌 กำลังเปิด Puppeteer โดยใช้ Chrome ที่:",
      "/usr/bin/google-chrome"
    );

    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome",
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    console.log("✅ Puppeteer เปิด Browser สำเร็จ");
    const page = await browser.newPage();

    // ✅ ตรวจสอบ URL ของรูปภาพ
    const checkImage = (image) =>
      image
        ? `http://localhost:3000/${image}`
        : "http://localhost:3000/default-profile.jpg";

    const htmlContent = `
       <html lang="th">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ใบสมัครงาน</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@200;400;700&display=swap');
          body { font-family: 'Sarabun', sans-serif; padding: 30px; width: 90%; max-width: 800px; }
          h1, h2 { text-align: center; font-weight: bold; }
          h3 { margin-top: 20px; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          td, th { border: 1px solid black; padding: 8px; text-align: left; }
          .container { position: relative; text-align: center;  }
          .logo { width: 100px; display: block; margin: 0 auto 10px; }
          .profile-image { width: 120px; height: 150px; display: block; margin: 0 auto; border: 1px solid black; }
          .document-image { width: 120px; height: 120px; display: block; margin: 5px auto; border: 1px solid black; }
          .page-break { page-break-before: always; }
          .signature { text-align: center; margin-top: 50px; font-weight: bold; }
          .committee { display: flex; justify-content: space-between; margin-top: 20px;}
          .logo { width: 150px; height: auto;}
 
  

          
        </style>
      </head>
      <body>

        <!-- ✅ หน้าแรก1 -->
        <div class="container">
           <img src="${logoURL}" class="logo" alt="โลโก้หน่วยงาน">
        </div>

        <h1>ใบสมัครงาน</h1>
        <h2>${data.Job.JobName} (${data.Job.Location})</h2>

        <h3>ข้อมูลผู้สมัคร</h3>
        <table>
          <tr>
            <td><b>ชื่อ-นามสกุล</b></td>
            <td>${data.firstName} ${data.lastName}</td>
            <td rowspan="5"><img src="${checkImage(
              data.profileImage
            )}" class="profile-image" alt="รูปถ่าย"></td>
          </tr>
          <tr><td><b>อายุ</b></td><td>${data.age} ปี</td></tr>
          <tr><td><b>สัญชาติ</b></td><td>${data.nationality}</td></tr>
          <tr><td><b>ศาสนา</b></td><td>${data.religion}</td></tr>
          <tr><td><b>สถานภาพสมรส</b></td><td>${data.maritalStatus}</td></tr> 
        </table>
        
        <h3>ที่อยู่ปัจจุบัน</h3>
        <table>
          <tr><td><b>บ้านเลขที่</b></td><td>${data.houseNumber}</td></tr>
          <tr><td><b>ตำบล</b></td><td>${data.subdistrict}</td></tr>
          <tr><td><b>อำเภอ</b></td><td>${data.district}</td></tr>
          <tr><td><b>จังหวัด</b></td><td>${data.province}</td></tr>
          <tr><td><b>รหัสไปรษณีย์</b></td><td>${data.postalCode}</td></tr>
          <tr><td><b>เบอร์โทรศัพท์</b></td><td>${data.phoneNumber}</td></tr>
        </table>
        
        <h3>ข้อมูลการศึกษา</h3>
        <table>
          <tr><td><b>ระดับการศึกษา</b></td><td>${data.degreeEarned}</td></tr>
          <tr><td><b>สาขา</b></td><td>${data.major}</td></tr>
          <tr><td><b>GPA</b></td><td>${data.gpa}</td></tr>
          <tr><td><b>สถาบัน</b></td><td>${data.institutionName}</td></tr>
          <tr><td><b>ระยะเวลาศึกษา</b></td><td>${data.periodofStudy}</td></tr>
        </table>

        <!-- ✅ หน้าที่ 2: เอกสารแนบ -->
        <div class="page-break"></div>

        <h3>เอกสารแนบ</h3>
        <table>
          <tr>
            <td><b>สำเนาบัตรประจำตัวประชาชน จำนวน ๑ ฉบับ</b></td>
            <td><img src="${checkImage(
              data.idCardImage
            )}" class="document-image"></td>
          </tr>

          <tr>
            <td><b>สำเนาสำเนาทะเบียนบ้าน จำนวน ๑ ฉบับ</b></td>
            <td><img src="${checkImage(
              data.houseRegistrationImage
            )}" class="document-image"></td>
          </tr>

          <tr>
            <td><b>สำเนาวุฒิการศึกษาหรือหนังสือรับรองหรือระเบียนแสดงการเรียนจำนวน ๑ ชุดภาษาไทย</b></td>
            <td><img src="${checkImage(
              data.degreeCertificateImage
            )}" class="document-image"></td>
          </tr>

          <tr>
            <td><b>Transcript (ตัวจริง)</b></td>
            <td><img src="${checkImage(
              data.transcriptImage
            )}" class="document-image"></td>
          </tr>

           <tr>
            <td><b>ใบผ่านเกณท์ทหาร</b></td>
            <td><img src="${checkImage(
              data.workCertificateImage
            )}" class="document-image"></td>
          </tr>

          <tr>
            <td><b>ใบรับรองแพทย์</b></td>
            <td><img src="${checkImage(
              data.medicalCertificateImage
            )}" class="document-image"></td>
          </tr>
                     
           <tr>
            <td><b>ประวัติอาชญากรรม</b></td>
            <td><img src="${checkImage(
              data.criminalRecordImage
            )}" class="document-image"></td>
          </tr>
    
           <tr>
            <td><b>Passport</b></td>
            <td><img src="${checkImage(
              data.passportImage
            )}" class="document-image"></td>
          </tr>

           <tr>
            <td><b>ใบขับขี่</b></td>
            <td><img src="${checkImage(
              data.drivingLicenseImage
            )}" class="document-image"></td>
          </tr>

           <tr>
            <td><b>ไฟล์แนบอื่น ๆ (สูงสุด 10 ไฟล์)</b></td>
            <td><img src="${checkImage(
              data.attachedFiles
            )}" class="document-image"></td>
          </tr>
        </table>
        
       
  <!-- ✅ หน้าที่ 3: ประวัติการทำงาน -->
        <div class="page-break"></div>
        <h3>ประวัติการทำงาน</h3>
        <table>
          <tr><td><b>สถานที่ทำงาน</b></td><td>${data.workPlace}</td></tr>
          <tr><td><b>ตำแหน่ง</b></td><td>${data.position}</td></tr>
          <tr><td><b>เงินเดือนล่าสุด</b></td><td>${data.lastSalary}</td></tr>
          <tr><td><b>ระยะเวลาทำงาน</b></td><td>${
            data.employmentDuration
          }</td></tr>
          <tr><td><b>เหตุผลลาออก</b></td><td>${data.reason}</td></tr>
        </table>
        
        <h3>บุคคลอ้างอิงฉุกเฉิน</h3>
        <table>
          <tr><td><b>ชื่อ-นามสกุล</b></td><td>${data.firstNameEmergency} ${
      data.lastNameEmergency
    }</td></tr>
          <tr><td><b>เบอร์โทร</b></td><td>${data.phoneNumberEmergency}</td></tr>
          <tr><td><b>ที่อยู่</b></td><td>${data.houseNumberEmergency}, ${
      data.subdistrictEmergency
    }, ${data.districtEmergency}, ${data.provinceEmergency}</td></tr>
        </table>

        <h3>ความสามารถพิเศษ</h3>
        <p>${data.specialSkills || "ไม่มีข้อมูล"}</p>

        <p class="signature">(ลงชื่อ) ....................................ผู้สมัคร</p>
        <p class="signature">....................................</p>
        <p class="signature">วันที่........เดือน...............พศ........</p>
        
         <!--หน้าที่ 4: ฝ่ายการรับสมัคร -->
        <div class="page-break"></div>
        <h3>ฝ่ายการรับสมัคร</h3>
        <table>
          <tr>
            <td><input type="checkbox"> หลักฐานถูกต้องครบถ้วน</td>
            <td><input type="checkbox"> หลักฐานไม่ครบ</td>
          </tr>
        </table>
        <p>(ลงชื่อ) .................................... เจ้าหน้าที่ผู้รับสมัคร</p>
        <p>วันที่ ......... เดือน ......... ปี .........</p>
        <h3>ฝ่ายการเงิน</h3>
        <p>ได้รับชำระค่าสมัครแล้วเป็นเงินจำนวน 500 บาท ในวันที่ ................</p>
        <p>(ลงชื่อ) ..................................เจ้าหน้าที่การเงิน</p>
        
        <h3>ฝ่ายตรวจสอบคุณสมบัติ</h3>
        <table>
          <tr>
            <td><input type="checkbox"> คุณสมบัติครบถ้วน</td>
            <td><input type="checkbox"> ขาดคุณสมบัติ</td>
          </tr>
        </table>
        <p>(ลงชื่อ) .......................................................ประธานกรรมการ</p>
        <p>(...............................................................)</p>
        <p>.................../.................../.........................</p>
        
        <p>(ลงชื่อ) .......................................................กรรมการ</p>
        <p>(...............................................................)</p>
        <p>.................../.................../.........................</p>
        
        <p>(ลงชื่อ) .......................................................กรรมการ</p>
        <p>(...............................................................)</p>
        <p>.................../.................../.........................</p>
      </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: "load" });

    const pdfFileName = `resume-${Date.now()}.pdf`;
    const pdfPath = path.join(uploadDir, pdfFileName);
    console.log("📌 กำลังบันทึก PDF ที่:", pdfPath);

    await page.pdf({ path: pdfPath, format: "A4", printBackground: true });

    await browser.close();
    console.log("✅ สร้าง PDF สำเร็จ");

    return pdfPath;
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาดขณะสร้าง PDF:", error);
    throw error;
  }
};

module.exports = generatePDF;
