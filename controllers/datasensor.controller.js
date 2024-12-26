const Datasensor=require("../models/datasensor.model");
const paginationHelper=require("../helpers/pagination");

// const { search } = require("../api/routes/datasensor.route");

//[GET] /api/datasensor
// xắp xếp , phân trang
module.exports.index=async(req,res)=>{
    const find={
        deleted:false
    };
    // tìm kiếm
    if (req.query.searchKey && req.query.searchValue) {
        const searchValue = req.query.searchValue;

        // Kiểm tra xem searchValue có phải là số hay không
        const isNumber = !isNaN(searchValue) && searchValue.trim() !== '';

        if (isNumber) {
            // Chuyển đổi thành số và tìm kiếm
            find[req.query.searchKey] = Number(searchValue);
        }
    }
    // let objectSearch = searchHelper(req.query);
    // if (req.query.temperature) {
    //     find.temperature = objectSearch.regex;
    //   }
      
    //   if (req.query.humidity) {
    //     find.humidity = objectSearch.regex;
    //   }
      
    //   if (req.query.light) {
    //     find.light = objectSearch.regex;
    //   }
    // if(req.query.keyword){
    //     find.$or = [
    //         { temperature: objectSearch.regex },
    //         { humidity: objectSearch.regex },
    //         { light: objectSearch.regex }
    //         // { time: objectSearch.regex } 
    //     ];
    // }

    // end tìm kiếm
    // phan trang
    let initPagniation={
        currentPage:1,
        limitItems: req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10, // Lấy giá trị từ frontend hoặc mặc định là 10
       // limitItems:10,
    };

    const countDatasensor=await Datasensor.countDocuments(find);
    const objectPagination =paginationHelper(
        initPagniation,
        req.query,
        countDatasensor
    )
       // end phan trang


// sort
    const sort={};

    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue === 'asc' ? 1 : -1;
    }
    // end sort
    const datasensor =await Datasensor.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip);
    
    res.json({
        data: datasensor,
        totalItems: countDatasensor,  // Trả về tổng số tài liệu
        currentPage: objectPagination.currentPage,  // Trả về trang hiện tại
        totalPages: Math.ceil(countDatasensor / objectPagination.limitItems) // Tính tổng số trang
    });
};

// [GET] api/datasensor/data
module.exports.data=async (req,res)=>{
    const find={
        deleted:false,
    };
    const datasensor =await Datasensor.find(find);
   // console.log(datasensor)
    res.json({
        data: datasensor
    });
}