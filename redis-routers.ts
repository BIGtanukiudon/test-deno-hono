import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { get as getRedis, set as setRedis } from '$/redis.ts'
import { HTTPException } from 'hono/http-exception'

const redis = new Hono()

const route = redis
  .get(
    '/',
    zValidator(
      'query',
      z.object({
        key: z.string(),
      }),
    ),
    async (c) => {
      const { key } = c.req.valid('query')

      const res = await getRedis(key).then((res) => {
        if (res != null) {
          return res
        } else {
          throw new HTTPException(404, { message: `Key ${key} not found` })
        }
      })
        .catch((err) => {
          console.error(err)
          throw new HTTPException(500)
        })

      return c.json({ message: res })
    },
  )
  .post(
    '/',
    zValidator(
      'query',
      z.object({
        key: z.string(),
        value: z.string(),
      }),
    ),
    async (c) => {
      const { key, value } = c.req.valid('query')

      const res = await setRedis(key, value).then((res) => {
        if (res == 'OK') {
          return c.json({ message: 'OK' })
        } else {
          throw new HTTPException(500, { message: 'Failed set.' })
        }
      })
        .catch((err) => {
          console.error(err)
          throw new HTTPException(500)
        })

      return c.json({ message: res })
    },
  )

export type AppType = typeof route

export default redis
