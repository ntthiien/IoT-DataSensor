const express =require("express");
const router=express.Router();

const controller =require("../../controllers/history.controller")

router.get("/", controller.index);
router.post("/",controller.pubsub);

module.exports=router;