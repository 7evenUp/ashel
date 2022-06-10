import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  options = {
    maxAge: 60 * 60 * 24, // 24 hours,
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}