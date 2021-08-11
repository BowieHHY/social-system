const Validator = require("validator")
const isEmpty = require('./is-empty')

module.exports = function validateEducationInput(data) {
  let errors = {}
  data.school = !isEmpty(data.school) ? data.school : ''
  data.degree = !isEmpty(data.degree) ? data.degree : ''
  data.from = !isEmpty(data.from) ? data.from : ''


  if (Validator.isEmpty(data.school)) {
    errors.school = '个人教育经历的school不能为空！'
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = '个人教育经历的degree不能为空！'
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = '个人教育经历的from不能为空！'
  }
  
  return {
    errors,
    isValid:isEmpty(errors)
  }
  
}