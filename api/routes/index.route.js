const datasensorRoutes=require("./datasensor.route");
const historyRoutes=require("./history.route");

module.exports=(app)=>{
    const api="/api";
    app.use(api + "/datasensor", datasensorRoutes);
    app.use(api + "/history", historyRoutes);
};