const now = new Date();

export default [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    id: 1,
    title: "ลงทะเบียนวิชาบังคับ",
    start: new Date(2024, 1, 15),
    end: new Date(2024, 1, 17),
  },
  {
    id: 2,
    title: "ลงทะเบียนวิชาเลือก",
    start: new Date(2024, 1, 18),
    end: new Date(2024, 1, 20),
  },

  {
    id: 14,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
];
