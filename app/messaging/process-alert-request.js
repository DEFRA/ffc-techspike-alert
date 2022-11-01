const processDataRequest = async (message, receiver) => {
  try {
    const messageBody = message.body
    console.log('Received alert request', messageBody)
    await receiver.completeMessage(message)
  } catch (err) {
    await receiver.deadLetterMessage(message)
    console.error('Unable to alert request:', err)
  }
}

module.exports = processDataRequest
