var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var commetSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
        age:{
            type:String,
            required:false
        },
        date:{
            type:Date,
            default:Date.now
        }
    }
);

commetSchema.methods.findAll= function (conditions,callback) {
    return this.db.model('Comment').find(callback);
}
commetSchema.methods.saveComment= function (callback) {
    
}
module.exports = mongoose.model(
    'Comment'
    ,commetSchema
);
// userSchema.loadClass(UserClass);

