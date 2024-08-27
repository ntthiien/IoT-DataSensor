import React, { useState } from 'react';
import './style.scss'; // Đảm bảo bạn đã tạo và nhập file CSS này

const DeviceControl = () => {
  // State để theo dõi trạng thái của các thiết bị
  const [lampOn, setLampOn] = useState(false);
  const [ceilingFanOn, setCeilingFanOn] = useState(false);
  const [airOn,setAirOn]=useState(false)

  // Hàm để bật/tắt đèn
  const toggleLamp = () => setLampOn(!lampOn);

  // Hàm để bật/tắt quạt trần
  const toggleCeilingFan = () => setCeilingFanOn(!ceilingFanOn);

  // ham de bat tat dieu hoa
  const toggleAir=()=>setAirOn(!airOn);

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
}

export default DeviceControl;
