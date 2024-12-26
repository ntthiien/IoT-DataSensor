const History=require("../models/history.model");
const paginationHelper=require("../helpers/pagination");
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://192.168.2.7:1993", {
    username: "hien",
    password: "123"
});


//[GET] api/history
module.exports.index= async(req,res)=>{
    const find={
        deleted:false,
        
    };
    // lọc
    if (req.query.device) {
        find.device = req.query.device; // Lọc theo tên thiết bị
    }
    // end lọc
    // tìm kiếm
    if (req.query.time) {
        const timeQuery = req.query.time.trim();

        // Kiểm tra nếu chỉ có ngày/tháng/năm (không có giờ, phút, giây)
        const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/; // Kiểm tra định dạng ngày/tháng/năm
        const datetimeRegex = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/; // Kiểm tra định dạng ngày/tháng/năm giờ:phút:giây

        let startTime, endTime;

        if (dateRegex.test(timeQuery)) {
            // Chỉ có ngày/tháng/năm
            const [, day, month, year] = timeQuery.match(dateRegex);
            startTime = new Date(year, month - 1, day, 0, 0, 0).toISOString();
            endTime = new Date(year, month - 1, day, 23, 59, 59, 999).toISOString(); // 23:59:59 trong ngày
            find.time = { $gte: startTime, $lte: endTime }; // Sử dụng $lte để bao gồm cuối ngày
        } else if (datetimeRegex.test(timeQuery)) {
            // Ngày/tháng/năm giờ:phút:giây
            const [, day, month, year, hour, minute, second] = timeQuery.match(datetimeRegex);
            startTime = new Date(year, month - 1, day, hour, minute, second).toISOString();
            endTime = new Date(year, month - 1, day, hour, minute, second, 999).toISOString();
            find.time = { $gte: startTime, $lte: endTime }; // Sử dụng $gte và $lte cho chính xác thời gian
        }
    }
    // end search

    // phan trang
    let initPagniation={
        currentPage:1,
        limitItems:10,
    };

    const countHistory=await History.countDocuments(find);
    const objectPagination =paginationHelper(
        initPagniation,
        req.query,
        countHistory
    )
       // end phan trang

       // sort
    const sort={};

    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue === 'asc' ? 1 : -1;
    }
    // end sort


    const history =await History.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip);
    console.log("Dữ liệu lịch sử:", history);

    if (history.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy dữ liệu." });
    }
    // Lấy bản ghi mới nhất của từng thiết bị
    const latestDeviceStates = await History.aggregate([
        { $match: find },
        { $sort: { time: -1 } },  // Sắp xếp theo thời gian giảm dần
        {
          $group: {
            _id: "$device", // Nhóm theo tên thiết bị
            device: { $first: "$device" },
            action: { $first: "$action" },
            time: { $first: "$time" },
          },
        },
    ]);


    res.json(
        {   data: history,
            totalItems: countHistory,  // Trả về tổng số tài liệu
            currentPage: objectPagination.currentPage,  // Trả về trang hiện tại
            totalPages: Math.ceil(countHistory / objectPagination.limitItems) // Tính tổng số trang
            }
    );
}





//[POST] api/history
module.exports.pubsub=async(req,res)=>{
    try {
        const { device, action } = req.body;
        console.log(req.body);
        const now = new Date();
        const history = new History({
            device,
            action,
            time: new Date(),
        });
        await history.save()
        .then(() => console.log('Data saved to MongoDB', history));
        
        // Publish MQTT message
        console.log("Sending MQTT message: ", action);
        client.publish("LED", action);
        
        res.status(201).json({ message: "Device action saved", history });
    } catch (error) {
        res.status(500).json({ error: "Failed to save device action" });
    }
}