import { NextApiRequest, NextApiResponse } from "next"
import { withSessionRoute } from "../../lib/withSession"

export default withSessionRoute(loginRoute)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)
  console.log(req.session)
  // get user from database then:
  req.session.user = {
    isLoggedIn: true
  }
  
  await req.session.save()
  console.log(req.session)
  res.send({ message: "OKEY"})
}

// import type { NextApiRequest, NextApiResponse } from 'next'
// import { setCookie } from '../../lib/cookies'

// type FormData = {
//   username: string
//   password: string
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse<FormData>) {
//   console.log('INSIDE API ROUTE')
//   console.log(req.body)

//   const { body: { username, password } } = req
//   console.log('ENV LOGIN', process.env.LOGIN)
//   console.log('ENV PASSWORD', process.env.PASSWORD)

//   if (process.env.LOGIN === username && process.env.PASSWORD === password) {
//     console.log('WORKS!')
//     setCookie(res, 'session', 'valid')
//   } else {
//     console.log('WRONG LOGIN')
//     setCookie(res, 'session', 'invalid')
//   }
  
//   res.end(res.getHeader('Set-Cookie'))
// }