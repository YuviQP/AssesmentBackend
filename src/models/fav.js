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
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
},{ 
  timestamps: true,
});

const Fav=model('Fav',favSchema);
module.exports=Fav;