// const mqtt = require('mqtt');
// const Datasensor = require("../models/datasensor.model");

//  module.exports.mqtt = async () => {
//     const client = mqtt.connect('mqtt://192.168.2.7:1993', {
//         username: 'hien',
//         password: '123'
//     });

//     client.on('connect', () => {
//         console.log('Connected to MQTT broker');
//         console.log("helo"); // Nên in ra chữ "helo" tại đây
//         client.subscribe('datasensor', (err) => {
//             if (!err) {
//                 console.log('Subscribed to topic datasensor');
//             } else {
//                 console.error('Subscription error:', err);
//             }
//         });
//     });

//     // Thêm kiểm tra lỗi kết nối
//     client.on('error', (err) => {
//         console.error('Error connecting to MQTT broker:', err);
//     });

//     // Nhận thông điệp từ topic MQTT
//     client.on('message', (topic, message) => {
//         const msg = message.toString();
//         //console.log(`Received message: ${msg}`);

//         // Tách dữ liệu
//         const dataParts = msg.split(", ");
//         if (dataParts.length < 3) {
//             console.error('Invalid message format:', msg);
//             return; // Dừng lại nếu định dạng không hợp lệ
//         }

//         const temperature = parseFloat(dataParts[0].split(": ")[1]);
//         const humidity = parseFloat(dataParts[1].split(": ")[1]);
//         const light = parseFloat(dataParts[2].split(": ")[1]);
//         const wwind=parseInt()

//         // Kiểm tra nếu các giá trị đọc được là hợp lệ
//         if (isNaN(temperature) || isNaN(humidity) || isNaN(light)) {
//             console.error('Invalid sensor data:', temperature, humidity, light);
//             return; // Dừng lại nếu dữ liệu không hợp lệ
//         }

//         // Lấy thời gian hiện tại
//         const currentTime = new Date();

//         // Lưu vào MongoDB
//         const datasensor = new Datasensor({
//             temperature: temperature,
//             humidity: humidity,
//             light: light,
//             deleted: false,
//             time: currentTime, // Lưu thời gian hiện tại
//         });

//         datasensor.save();
//             // .then(() => console.log('Data saved to MongoDB', datasensor))
//             // .catch(err => console.error('Error saving data:', err));
//     });
// };

const mqtt = require('mqtt');
const Datasensor = require("../models/datasensor.model");
const { data } = require('../controllers/datasensor.controller');

module.exports.mqtt = async () => {
    const client = mqtt.connect('mqtt://192.168.2.7:1993', {
        username: 'hien',
        password: '123',
    });

    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe('datasensor', (err) => {
            if (!err) {
                console.log('Subscribed to topic datasensor');
            } else {
                console.error('Subscription error:', err);
            }
        });
    });

    // Xử lý lỗi kết nối MQTT
    client.on('error', (err) => {
        console.error('Error connecting to MQTT broker:', err);
    });

    // Nhận thông điệp từ topic MQTT
    client.on('message', (topic, message) => {
        try {
            const msg = message.toString();
           // console.log(msg)
            // Tách và kiểm tra dữ liệu từ thông điệp MQTT
            const dataParts = msg.split(", ");
            if (dataParts.length < 4) {
                console.error('Invalid message format:', msg);
                return;
            }

            const temperature = parseFloat(dataParts[0].split(": ")[1]);
            const humidity = parseFloat(dataParts[1].split(": ")[1]);
            const light = parseInt(dataParts[2].split(": ")[1]);
            const windSpeed = parseInt(dataParts[3].split(": ")[1]);
           // console.log(windSpeed)

            // Kiểm tra giá trị dữ liệu
            if (isNaN(temperature) || isNaN(humidity) || isNaN(light) || isNaN(windSpeed)) {
                console.error('Invalid sensor data:', { temperature, humidity, light, windSpeed });
                return;
            }

            // Lấy thời gian hiện tại
            const currentTime = new Date();

            // Lưu dữ liệu vào MongoDB
            const datasensor = new Datasensor({
                temperature,
                humidity,
                light,
                windSpeed,
                deleted: false,
                time: currentTime,
            });
           // console.log(datasensor)
            datasensor
                .save()
                .catch((err) => console.error('Error saving data:', err));
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });
};
