import React, { useState, useEffect } from 'react';
import './style.scss';

const LED = () => {
  const [led2On, setLed2On] = useState(() => JSON.parse(localStorage.getItem('led2On')) || false);
  const [led3On, setLed3On] = useState(() => JSON.parse(localStorage.getItem('led3On')) || false);

  useEffect(() => {
    const fetchDeviceStates = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/history");
        const result = await response.json();
        const devices = result.data;

        // Cập nhật chỉ khi localStorage chưa có dữ liệu
        if (!localStorage.getItem('led2On') && !localStorage.getItem('led3On')) {
          devices.forEach((device) => {
            switch (device.device) {
              case "LED2":
                setLed2On(device.action === "led2_on");
                break;
              case "LED3":
                setLed3On(device.action === "led3_on");
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
    localStorage.setItem('led2On', JSON.stringify(led2On));
  }, [led2On]);

  useEffect(() => {
    localStorage.setItem('led3On', JSON.stringify(led3On));
  }, [led3On]);

  const sendDeviceAction = async (device, action) => {
    try {
      await fetch("http://localhost:5001/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device, action }),
      });
    } catch (error) {
      console.error("Error sending device action:", error);
    }
  };

  const toggleLed2 = async () => {
    const action = led2On ? "led2_off" : "led2_on";
    setLed2On(!led2On);
    await sendDeviceAction("LED2", action);
  };

  const toggleLed3 = async () => {
    const action = led3On ? "led3_off" : "led3_on";
    setLed3On(!led3On);
    await sendDeviceAction("LED3", action);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>LED2</h3>
        <label className="switch">
          <input type="checkbox" checked={led2On} onChange={toggleLed2} />
          <span className="slider"></span>
        </label>
        <span>Status: {led2On ? 'On' : 'Off'}</span>
      </div>
      <div>
        <h3>LED3</h3>
        <label className="switch">
          <input type="checkbox" checked={led3On} onChange={toggleLed3} />
          <span className="slider"></span>
        </label>
        <span>Status: {led3On ? 'On' : 'Off'}</span>
      </div>
    </div>
  );
};

export default LED;
