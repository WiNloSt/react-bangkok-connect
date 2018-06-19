import { getOtp, setOtp, getUser, setUser } from '../data'

export const setUserData = async user => {
  setUser(user.uid, { name: user.displayName })
}

export const createOtpForUserIfNotExist = async user => {
  const userFromDb = await getUser(user.uid)
  const hasOtp = userFromDb && userFromDb.otp > -1
  if (hasOtp) return

  let otp = generateOtp()
  while (await otpExists(otp)) {
    otp = generateOtp()
  }

  setOtp(otp, {
    user: user.uid
  })

  setUser(user.uid, {
    otp
  })
}

async function otpExists(otp) {
  const otpFromDb = await getOtp(otp)
  return otpFromDb === otp
}

function generateOtp() {
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, 0)
}
