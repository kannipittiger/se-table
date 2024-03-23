

const EduAlert = () => {
    return (
        <div className="allbox">
          <div className="header">
            <img src={logo} className="imglogo" alt="logo" />
            <div className="kubar">
              <div className="thai_ku">มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</div>
              <div className="english_ku">Kasetsart University Sriracha Campus</div>
              <div />
            </div>
            <div className="menu_bar">
              <div className="profile">Profile</div>
              <div className="sign-In">หน้าหลัก</div>
            </div>
          </div>
          <div className="whitebox">
            <div className="bxx1sedu">ชื่ออาจารย์</div>
            <div className="bxx2sedu">รหัสวิชา</div>
            <div className="bxx3sedu">ชื่อวิชา</div>
            <div className="bxx4sedu">หน่วยกิต</div>
            <div className="bxx5sedu">หมู่เรียน</div>
            <div className="bxx10sedu">ห้อง</div>
            <div className="bxx6sedu">บังคับ/เลือก</div>
            <div className="bxx7sedu">สาขา</div>
            <div className="bxx8sedu">วันและเวลา</div>
            {data.length > 0 && (
    
            <div className="scroll-scheEdu">
              {data.map((row, index) => (
                <div key={index} className="renderimport">
    
                  <div className="box_Se_teacher">{row.user_name}</div>
                  <div className="box_Se_id">{row.subject_id}</div>
                  <div className="box_Se_name">{row.subject_name}</div>
                  <div className="box_Se_credit">{row.subject_credit}</div>
                  <div className="box_Se_sec">{row.subject_sec}</div>
                  <div>
                  <select className="box_Se_room"  onChange={(event) => handleChange(index, row.room, event)}>
              <option value="">{row.room}</option>
              <option value="DAT">DAT</option>
              <option value="LABCOM1">LABCOM 1</option>
              <option value="LABCOM2">LABCOM 2</option>
              <option value="LABCOM23">LABCOM 23</option>
            </select>
                  </div>
                  <div className="box_Se_force_or_not">{row.subject_required}</div>
                  <div className="box_Se_major">{row.subject_major}</div>
                  <div className="box_Se_day">{row.subject_day} {row.subject_start}-{row.subject_end}</div>
    
                </div>
    
              ))}
            </div>
          )}
            
            {/* <div className="scroll-scheteacher">
              {selectedSubjects.map((subjectId, index) => (
                <div className="chose" key={index}>
                  <div className="box_Se_id">{subjectId}</div>
                  <div className="box_Se_name">{subjectId}</div>
                  <div className="box_Se_credit">{subjectId}</div>
                  <div className="box_Se_sec">{subjectId}</div>
                  <div className="box_Se_no">{subjectId}</div>
                  <div className="box_Se_force_or_not">{subjectId}</div>
                  <div className="box_Se_major">{subjectId}</div>
                  <div className="box_Se_day">{subjectId}</div>
                </div>
              ))}
            </div> */}
            <div className="submitEDU">ยืนยัน</div>
            <div className="exportEDU">export</div>
          </div>
        </div>
      );
}

export default EduAlert;