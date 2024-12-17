import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    const message = req.body.message;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if(newMessage){
        conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Internal Server Error send message" });
  }
};

export const getAllConversations = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const conversations = await Conversation.find({
        participants: userId
      })
        .populate({
          path: "participants",
          select: "fullName profilePicture", 
        })
        .populate("messages"); 
  
      if (!conversations || conversations.length === 0) {
        return res.status(400).json([]);
      }
  
      const formattedConversations = conversations.map((conversation) => {
        const otherParticipant = conversation.participants.find(
          (participant) => participant._id.toString() !== userId.toString()
        );
  
        return {
          _id: conversation._id,
          participant: {
            _id: otherParticipant._id,
            fullName: otherParticipant.fullName,
            profilePicture: otherParticipant.profilePicture,
          },
          lastMessage: conversation.messages[conversation.messages.length - 1],
        };
      });
  
      res.status(200).json(formattedConversations);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error get all messages" });
    }
  };
  


export const getAllMessages = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const userId = req.user._id;

        const chat = await Conversation.findOne({_id: chatId, participants: userId}).populate("messages");
        if(!chat){
            return res.status(400).json([]);
        }

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error get all messages"})
    }
}

export const getChatId = async (req, res) => {
  try {
    const userId = req.body.userId;
    const chatId = await Conversation.findOne({participants: userId}).select("_id");
    if(!chatId){
      return res.status(400).json({error: "No existing chat"});
    }

  res.status(200).json(chatId);    
  } catch (error) {
    res.status(500).json({error: "Internal Server Error get chat id"});
  }
}