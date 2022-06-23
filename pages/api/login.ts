import { NextApiRequest, NextApiResponse } from "next"
import { withSessionRoute } from "../../lib/withSession"

export default withSessionRoute(loginRoute)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body

  if (process.env.LOGIN === username && process.env.PASSWORD === password) {
    req.session.user = {
      isLoggedIn: true
    }

    await req.session.save()
    res.send({ message: "OKEY"})
  } else if(username === 'RootUser' && password === 'RootUserPassword') {
    res.status(500).json({ message: 'Какой же ты наивный(ая). Так я и дал тебе доступ в админку.' })
  } else {
    res.status(500).json({ message: 'Wrong Password' })
  }
}