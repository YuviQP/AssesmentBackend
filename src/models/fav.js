const { Schema, model, models }=require('mongoose');

const favSchema=new Schema({
    title:{
        type:String,
    },
    description: {
        type: String, 
      },   
    link:{
        type:String,
    },
},{ 
  timestamps: true,
});
userSchema.pre('save',async function(){
  if(this.password && this.isModified('password')){
    this.password=await bcrypt.hash(this.password, 10)
  }
});
const Fav=model('Fav',favSchema);
module.exports=Fav;