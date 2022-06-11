import { NextApiRequest, NextApiResponse } from "next"
import { withSessionRoute } from "../../lib/withSession"

export default withSessionRoute(userRoute)

export type UserType = {
  isLoggedIn: boolean
}

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  res.json({ isLoggedIn: req.session.user ? true : false })
}