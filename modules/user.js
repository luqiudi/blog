var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var id = new mongoose.Schame.ObjectId() ;
var userSchema = new Schema(
    {
        _id:{
            type:String,
            default:id
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        nickname:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        create_time:{
            type:Date,
            default:Date.now
        },
        last_modify_time:{
            type:Date,
            default:Date.now
        },
        avatar:{
            type:String,
            default:''
        },
        gender:{
            type:Number,
            enum:[-1,0,1],
            default:0
        },
    }
);


module.exports = mongoose.model(
    'User'
    ,userSchema
);
// userSchema.loadClass(UserClass);

