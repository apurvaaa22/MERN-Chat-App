// chatName
// isGroupChat
// users
// latestMessage
// groupAdmin

const mongoose = require("mongoose");

const chatSchema=mongoose.Schema(
    {
        chatName:{
            type:String,
            trim:true
        },
        isGroupChat:{
            type:Boolean,
            default:false
        },
        // it will array because single chat will have 2 users and group chat will have multiple users
        users:[
            {
                // means this will contain id to that particular user
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
        ],
        latestMessage:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"Message"
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }

    },
    {
        timestamps:true
    }
);

const Chat=mongoose.model("Chat",chatSchema);

module.exports=Chat;