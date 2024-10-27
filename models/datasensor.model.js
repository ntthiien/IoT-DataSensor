const mongoose=require("mongoose");

const datasensorSchema=new mongoose.Schema(
    {
        temperature:Number,
        humidity:Number,
        light:Number,
        deleted:{
            type:Boolean,
            default:false,
        },
        time: {
            type: Date,
            default: Date.now // Thêm trường thời gian với giá trị mặc định là thời gian hiện tại
        }
    }
);
const Datasensor=mongoose.model("Datasensor", datasensorSchema,"datasensor");
module.exports=Datasensor;