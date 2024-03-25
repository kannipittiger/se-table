import { read, utils, writeFile } from "xlsx";

function exportToExcel(data) {
  const fileName = "education_schedule.xlsx"; // ชื่อไฟล์ Excel

  // กำหนดข้อมูลที่ต้องการใส่ใน Excel
  const sheetData = data.map(row => ({
    "ชื่ออาจารย์": row.user_name,
    "รหัสวิชา": row.subject_id,
    "ชื่อวิชา": row.subject_name,
    "หน่วยกิต": row.subject_credit,
    "หมู่เรียน": row.subject_sec,
    "ห้อง": row.room,
    "บังคับ/เลือก": row.subject_required === 1 ? "บังคับ" : "เสรี",
    "สาขา": row.subject_major,
    "วันและเวลา": `${row.subject_day} ${row.subject_start}-${row.subject_end}`
  }));

  const worksheet = utils.json_to_sheet(sheetData);

  // สร้าง workbook
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Schedule");

  // สร้างไฟล์ Excel
  writeFile(workbook, fileName);
}

export default exportToExcel;
