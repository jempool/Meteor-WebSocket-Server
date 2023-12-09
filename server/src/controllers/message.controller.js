import messageService from '../services/message.service.js';

export default {
  getAllMessages: function (req, res, next) {
    const messages = messageService.getAllMessages();
    JsonRoutes.sendResult(res, {
      data: messages
    });
  }
};



