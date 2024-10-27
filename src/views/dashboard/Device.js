// import React, { useState } from 'react';
// import './style.scss'; // Đảm bảo bạn đã tạo và nhập file CSS này

// const DeviceControl = () => {
//   // State để theo dõi trạng thái của các thiết bị
//   const [lampOn, setLampOn] = useState(false);
//   const [ceilingFanOn, setCeilingFanOn] = useState(false);
//   const [airOn,setAirOn]=useState(false)

//   // Hàm để bật/tắt đèn
//   const toggleLamp = () => setLampOn(!lampOn);

//   // Hàm để bật/tắt quạt trần
//   const toggleCeilingFan = () => setCeilingFanOn(!ceilingFanOn);

//   // ham de bat tat dieu hoa
//   const toggleAir=()=>setAirOn(!airOn);

//   return (
//     <div style={{ padding: '20px' }}>
//       <div style={{ marginBottom: '20px' }}>
//         <h3>Lamp</h3>
//         <label className="switch">
//           <input type="checkbox" checked={lampOn} onChange={toggleLamp} />
//           <span className="slider"></span>
//         </label>
//         <span>Status: {lampOn ? 'On' : 'Off'}</span>
//       </div>
//       <div style={{ marginBottom: '20px' }}>
//         <h3>Ceiling Fan</h3>
//         <label className="switch">
//           <input type="checkbox" checked={ceilingFanOn} onChange={toggleCeilingFan} />
//           <span className="slider"></span>
//         </label>
//         <span>Status: {ceilingFanOn ? 'On' : 'Off'}</span>
//       </div>
//       <div>
//         <h3>Air Conditioner</h3>
//         <label className="switch">
//           <input type="checkbox" checked={airOn} onChange={toggleAir} />
//           <span className="slider"></span>
//         </label>
//         <span>Status: {airOn ? 'On' : 'Off'}</span>
//       </div>
//     </div>
//   );
// }

// export default DeviceControl;

// import React, { useState,useEffect } from 'react';
// import './style.scss'; // Đảm bảo bạn đã tạo và nhập file CSS này
// const DeviceControl = () => {
//   const [lampOn, setLampOn] = useState(false);
//   const [ceilingFanOn, setCeilingFanOn] = useState(false);
//   const [airOn, setAirOn] = useState(false);
//     // Lấy trạng thái thiết bị từ backend khi tải trang
//     useEffect(() => {
//       const fetchDeviceStates = async () => {
//         try {
//           const response = await fetch("http://localhost:5000/api/history");
//           const result = await response.json();
//           const devices = result.data;
  
//           // Cập nhật trạng thái của từng thiết bị dựa vào dữ liệu từ backend
//           devices.forEach((device) => {
//             switch (device.device) {
//               case "Lamp":
//                 setLampOn(device.action === "bulb_on");
//                 break;
//               case "Ceiling Fan":
//                 setCeilingFanOn(device.action === "fan_on");
//                 break;
//               case "Air Conditioner":
//                 setAirOn(device.action === "ac_on");
//                 break;
//               default:
//                 break;
//             }
//           });
//         } catch (error) {
//           console.error("Failed to fetch device states:", error);
//         }
//       };
  
//       fetchDeviceStates();
//     }, []);
//   // Hàm gửi yêu cầu tới backend
//   const sendDeviceAction = async (device, action) => {
//     try {
//       await fetch("http://localhost:5000/api/history", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ device, action }),
//       });
//     } catch (error) {
//       console.error("Error sending device action:", error);
//     }
//   };

//   const toggleLamp = async () => {
//     const action = lampOn ? "bulb_off" : "bulb_on";
//     setLampOn(!lampOn);
//     await sendDeviceAction("Lamp", action);
//   };

//   const toggleCeilingFan = async () => {
//     const action = ceilingFanOn ? "fan_off" : "fan_on";
//     setCeilingFanOn(!ceilingFanOn);
//     await sendDeviceAction("Ceiling Fan", action);
//   };

//   const toggleAir = async () => {
//     const action = airOn ? "ac_off" : "ac_on";
//     setAirOn(!airOn);
//     await sendDeviceAction("Air Conditioner", action);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <div style={{ marginBottom: '20px' }}>
//         <h3>Lamp</h3>
//         <label className="switch">
//           <input type="checkbox" checked={lampOn} onChange={toggleLamp} />
//           <span className="slider"></span>
//         </label>
//         <span>Status: {lampOn ? 'On' : 'Off'}</span>
//       </div>
//       <div style={{ marginBottom: '20px' }}>
//         <h3>Ceiling Fan</h3>
//         <label className="switch">
//           <input type="checkbox" checked={ceilingFanOn} onChange={toggleCeilingFan} />
//           <span className="slider"></span>
//         </label>
//         <span>Status: {ceilingFanOn ? 'On' : 'Off'}</span>
//       </div>
//       <div>
//         <h3>Air Conditioner</h3>
//         <label className="switch">
//           <input type="checkbox" checked={airOn} onChange={toggleAir} />
//           <span className="slider"></span>
//         </label>
//         <span>Status: {airOn ? 'On' : 'Off'}</span>
//       </div>
//     </div>
//   );
// }

// export default DeviceControl;





import React, { useState, useEffect } from 'react';
import './style.scss';

const DeviceControl = () => {
  const [lampOn, setLampOn] = useState(() => JSON.parse(localStorage.getItem('lampOn')) || false);
  const [ceilingFanOn, setCeilingFanOn] = useState(() => JSON.parse(localStorage.getItem('ceilingFanOn')) || false);
  const [airOn, setAirOn] = useState(() => JSON.parse(localStorage.getItem('airOn')) || false);

  useEffect(() => {
    const fetchDeviceStates = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/history");
        const result = await response.json();
        const devices = result.data;

        // Cập nhật chỉ khi localStorage chưa có dữ liệu
        if (!localStorage.getItem('lampOn') && !localStorage.getItem('ceilingFanOn') && !localStorage.getItem('airOn')) {
          devices.forEach((device) => {
            switch (device.device) {
              case "Lamp":
                setLampOn(device.action === "bulb_on");
                break;
              case "Ceiling Fan":
                setCeilingFanOn(device.action === "fan_on");
                break;
              case "Air Conditioner":
                setAirOn(device.action === "ac_on");
                break;
              default:
                break;
            }
          });
        }
      } catch (error) {
        console.error("Failed to fetch device states:", error);
      }
    };

    fetchDeviceStates();
  }, []);

  // Lưu trạng thái vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('lampOn', JSON.stringify(lampOn));
  }, [lampOn]);

  useEffect(() => {
    localStorage.setItem('ceilingFanOn', JSON.stringify(ceilingFanOn));
  }, [ceilingFanOn]);

  useEffect(() => {
    localStorage.setItem('airOn', JSON.stringify(airOn));
  }, [airOn]);

  const sendDeviceAction = async (device, action) => {
    try {
      await fetch("http://localhost:5000/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device, action }),
      });
    } catch (error) {
      console.error("Error sending device action:", error);
    }
  };

  const toggleLamp = async () => {
    const action = lampOn ? "bulb_off" : "bulb_on";
    setLampOn(!lampOn);
    await sendDeviceAction("Lamp", action);
  };

  const toggleCeilingFan = async () => {
    const action = ceilingFanOn ? "fan_off" : "fan_on";
    setCeilingFanOn(!ceilingFanOn);
    await sendDeviceAction("Ceiling Fan", action);
  };

  const toggleAir = async () => {
    const action = airOn ? "ac_off" : "ac_on";
    setAirOn(!airOn);
    await sendDeviceAction("Air Conditioner", action);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Lamp</h3>
        <label className="switch">
          <input type="checkbox" checked={lampOn} onChange={toggleLamp} />
          <span className="slider"></span>
        </label>
        <span>Status: {lampOn ? 'On' : 'Off'}</span>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Ceiling Fan</h3>
        <label className="switch">
          <input type="checkbox" checked={ceilingFanOn} onChange={toggleCeilingFan} />
          <span className="slider"></span>
        </label>
        <span>Status: {ceilingFanOn ? 'On' : 'Off'}</span>
      </div>
      <div>
        <h3>Air Conditioner</h3>
        <label className="switch">
          <input type="checkbox" checked={airOn} onChange={toggleAir} />
          <span className="slider"></span>
        </label>
        <span>Status: {airOn ? 'On' : 'Off'}</span>
      </div>
    </div>
  );
};

export default DeviceControl;
