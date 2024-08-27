import React from 'react';
import './style.scss';

const Profile = () => {
  const members = [
    {
      name: 'Phạm Ngọc Linh',
      studentId: 'B21DCCN488',
      className: 'IoT nhóm 5',
      avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg', // Thay đổi bằng URL ảnh thực
    },
    {
      name: 'Nguyễn Thị Thu Hiền',
      studentId: 'B21DCCN336',
      className: 'IoT nhóm 5',
      avatar: 'https://media.licdn.com/dms/image/v2/D560BAQE96KctT7x-iw/company-logo_200_200/company-logo_200_200/0/1666170056423?e=2147483647&v=beta&t=Vw7Ylrels80CcHftE1Xb2dkTNDca30jOvBrI4iLL0qg', // Thay đổi bằng URL ảnh thực
    },
    {
      name: 'Nguyễn Thị Bảo Ngọc',
      studentId: 'B21DCCN566',
      className: 'IoT nhóm 5',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUO7KmhEYmL1i-oVNgAfNDecjmGZtFkIsgA&s',
    }
    ];

  const commonGithub = "https://github.com/common-repo";
  const commonPdf = "/path/to/common-document.pdf";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Thông tin sinh viên</h2>
        <ul className="student-list">
          {members.map((member, index) => (
            <li key={index} className="student-item">
              <img src={member.avatar} alt={member.name} className="student-avatar" />
              <div className="student-info">
                <p><strong>Tên:</strong> {member.name}</p>
                <p><strong>Mã sinh viên:</strong> {member.studentId}</p>
                <p><strong>Lớp:</strong> {member.className}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="common-links">
        <div className="github-section">
          <h2>Common GitHub Repository</h2>
          <a href={commonGithub} target="_blank" rel="noopener noreferrer">
            {commonGithub}
          </a>
        </div>

        <div className="pdf-section">
          <h2>Common PDF Document</h2>
          <a href={commonPdf} target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;