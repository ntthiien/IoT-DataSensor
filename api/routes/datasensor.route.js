const express =require("express");
const router=express.Router();

const controller =require("../../controllers/datasensor.controller")

router.get("/", controller.index);
router.get("/data", controller.data);

module.exports=router;