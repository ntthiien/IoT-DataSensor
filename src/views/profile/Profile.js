// import React  from "react";

// const Profile = () => {
//     return (
//         <div>
//             <h2> hello</h2>
//         </div>
//     )
// }

// export default Profile

// src/components/Profile.js
import React from 'react';
import './style.scss'; // Tạo file CSS nếu cần

const Profile = () => {
  // Giả lập thông tin người dùng
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "A passionate developer from New York.",
   // avatar: "https://via.placeholder.com/150",
    joined: "January 2020"
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
        <h2>{user.name}</h2>
      </div>
      <div className="profile-body">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        <p><strong>Joined:</strong> {user.joined}</p>
      </div>
    </div>
  );
}

export default Profile;