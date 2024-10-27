const History=require("../models/history.model");
const paginationHelper=require("../helpers/pagination");
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://192.168.1.67:1993", {
    username: "hien",
    password: "123"
});


//[GET] api/history
module.exports.index= async(req,res)=>{
    const find={
        deleted:false
    };

    // tìm kiếm
    if (req.query.searchKey && req.query.searchValue) {
        const regex = new RegExp(req.query.searchValue, 'i'); // Tạo regex cho tìm kiếm không phân biệt hoa thường
        find[req.query.searchKey] = regex; // Tìm kiếm theo trường searchKey
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

        // Format the date and time
        // const formattedTime = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        // const history = new History({
        //     device,
        //     action,
        //     time: formattedTime, // Use the formatted time string here
        // });

        const history = new History({
            device,
            action,
            time: new Date(),
        });
        await history.save()
        .then(() => console.log('Data saved to MongoDB', history));
        
        // Publish MQTT message
        client.publish("LED", action);
        
        res.status(201).json({ message: "Device action saved", history });
    } catch (error) {
        res.status(500).json({ error: "Failed to save device action" });
    }
}