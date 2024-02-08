import { currentUser } from '@/lib/auth'
import { UserInfo } from '@/components/user-info'

async function getTickets() {
  // imitate delay
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return false
}

const ServerPage = async () => {
  const tickets = await getTickets()
  const user = await currentUser()

  return <UserInfo label='💻 Server component' user={user} />
}

export default ServerPage
