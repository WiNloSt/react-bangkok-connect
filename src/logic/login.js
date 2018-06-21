import { getOtp, setOtp, getUser, setUser } from '../data'

export const setUserData = async authUser => {
  const { displayName, photoURL, uid } = authUser
  setUser(authUser.uid, { name: displayName, photoURL, uid })
}

export const createOtpForUserIfNotExist = async authUser => {
  const userFromDb = await getUser(authUser.uid)
  const hasOtp = userFromDb && userFromDb.otp > -1
  if (hasOtp) return

  let otp = generateOtp()
  while (await otpExists(otp)) {
    otp = generateOtp()
  }

  setOtp(otp, {
    user: authUser.uid
  })

  setUser(authUser.uid, {
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
