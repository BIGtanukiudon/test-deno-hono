import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const hello = new Hono()
  .get(
    '/',
    zValidator(
      'query',
      z.object({
        name: z.string(),
      }),
    ),
    (c) => {
      const { name } = c.req.valid('query')

      return c.json({ message: `Hello, ${name}!` })
    },
  )

export default hello
