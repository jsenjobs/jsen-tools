var token = ''
var setToken = function (t) {
  token = t
}
var getToken = function () {
  return token
}
var Global = {
  'setToken': setToken,
  'getToken': getToken
}
export default Global
