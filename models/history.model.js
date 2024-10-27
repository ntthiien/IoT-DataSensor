const mongoose=require("mongoose");

const historySchema=new mongoose.Schema(
    {
        device: String,
        action: String,
        time: {
            type: Date,
            default: Date.now // Thêm trường thời gian với giá trị mặc định là thời gian hiện tại
        },
        deleted:{
            type:Boolean,
            default:false,
        }
    }
);
const History=mongoose.model("History", historySchema,"history");
module.exports=History;