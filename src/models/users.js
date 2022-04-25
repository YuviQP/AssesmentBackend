const { MongoCredentials } = require('mongodb');
const { Schema, model, models }=require('mongoose');
const bcrypt=require('bcrypt')

const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const emailRegexp=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
const userSchema=new Schema({
    email: {
        type: String,
        match:emailRegexp,
        validate: [
          {
            async validator(email) {
              try {
                const user = await models.User.findOne({ email });
                return !user;
              } catch(e) {
                return false;
              }
            },
            message: 'El correo ya está en uso.',
          }
        ], 
      },
        
    password:{
        type:String,
        match:passwordRegexp,
    },
    favs:{
        type:[{
          type:Schema.Types.ObjectId,
          ref:'Fav',
        }]
    }
},{ 
  timestamps: true,
});
userSchema.pre('save',async function(){
  if(this.password && this.isModified('password')){
    this.password=await bcrypt.hash(this.password, 10)
  }
});
const User=model('User',userSchema);
module.exports=User;