const User =
require("../models/User");

exports.upgradePlan =
async (req,res)=>{
 try{
   const { plan } =
   req.body;

   const user =
   await User.findByIdAndUpdate(
      req.user.id,
      { plan },
      { new:true }
   );

   res.json(user);

 }catch(err){
   res.status(500).json({
      message:err.message
   });
 }
}