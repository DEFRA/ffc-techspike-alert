const { MessageReceiver } = require('ffc-messaging')
const processAlertRequest = require('./process-alert-request')
const { customerRegistryAlertRequestQueue } = require('../config').messageQueueConfig

let alertReceiver

const start = async () => {
  const alertAction = message => processAlertRequest(message, alertReceiver)
  alertReceiver = new MessageReceiver(customerRegistryAlertRequestQueue, alertAction)
  await alertReceiver.subscribe()

  console.info('Ready to receive messages')
}

const stop = async () => {
  await alertReceiver.closeConnection()
}

module.exports = { start, stop }
