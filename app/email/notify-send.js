const notifyClient = require('./notify-client')
const { templateIdAlert } = require('../config').notifyConfig

const send = async (emailAddress, message) => {
  if (emailAddress) {
    const personalisation = { message }
    return notifyClient.sendEmail(
      templateIdAlert,
      emailAddress,
      { personalisation }
    )
  }
}

module.exports = send
