import { queryUser, setFriend } from '../data'

export const handleAddFriendWithOtp = async (otp, uid) => {
  const user = await queryUser(['otp', '==', otp])
  setFriend(uid, user)
  console.log('friend added')
}
