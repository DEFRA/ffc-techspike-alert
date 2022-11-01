const Joi = require('joi')
const uuidRegex = '[0-9a-f]{8}\\b-[0-9a-f]{4}\\b-[0-9a-f]{4}\\b-[0-9a-f]{4}\\b-[0-9a-f]{12}'
const notifyApiKeyRegex = new RegExp(`.*-${uuidRegex}-${uuidRegex}`)

const schema = Joi.object({
  apiKey: Joi.string().pattern(notifyApiKeyRegex),
  templateIdAlert: Joi.string().uuid()
})

const config = {
  apiKey: process.env.NOTIFY_CUSTOMER_REGISTRY_API_KEY,
  templateIdAlert: process.env.NOTIFY_TEMPLATE_ID_CUSTOMER_REGISTRY_ALERT
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`Notify config is invalid. ${error.message}`)
}

module.exports = value
