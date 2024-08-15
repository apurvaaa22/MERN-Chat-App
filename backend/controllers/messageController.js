const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/messageSchema");
const User = require("../models/userSchema");
const Chat = require("../models/chatSchema")

const sendMessage = expressAsyncHandler(async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name email'
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });

        res.json(message);

    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
});

const allMessages = expressAsyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name email")
            .populate("chat");

        res.json(messages);
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
})

module.exports = { sendMessage, allMessages };