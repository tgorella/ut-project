import User from "../../models/User.js";

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

async function getUser (userId) {
const user = await User.findById(userId)
user.password = null
return user
}

export {
  isTokenInvalid,
  getUser
}