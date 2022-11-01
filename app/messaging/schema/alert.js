const Joi = require('joi')
const util = require('util')
const alertSchema = Joi.object({
  email: Joi.string().required(),
  message: Joi.string().required()
})

const validateAlert = (event) => {
  const validate = alertSchema.validate(event)

  if (validate.error) {
    console.log('Alert validation error:', util.inspect(validate.error, false, null, true))
    return false
  }

  return true
}

module.exports = validateAlert
