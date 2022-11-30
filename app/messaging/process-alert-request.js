const validateAlert = require('./schema/alert')
const notifySend = require('../email/notify-send')

const processDataRequest = async (message, receiver) => {
  try {
    const messageBody = message.body
    if (validateAlert(messageBody)) {
      console.log('Received alert request', messageBody)
      await notifySend(messageBody.email, messageBody.message)
      await receiver.completeMessage(message)
    } else {
      await receiver.deadLetterMessage(message)
      console.error('Unable to alert request')
    }
  } catch (err) {
    await receiver.deadLetterMessage(message)
    console.error('Unable to alert request:', err)
  }
}

module.exports = processDataRequest
