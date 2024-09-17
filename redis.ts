import { connect, RedisConnectOptions } from 'redis'

const REDIS_HOSTNAME = Deno.env.get('REDIS_HOSTNAME') || 'test-deno-hono-redis'
const REDIS_PORT = Deno.env.get('REDIS_PORT') || 6379

const options: RedisConnectOptions = {
  hostname: REDIS_HOSTNAME,
  port: REDIS_PORT,
}

export const set = async (key: string, value: string) => {
  const redis = await connect(options)

  try {
    const res = await redis.set(key, value)
    redis.close()
    return res
  } catch (err) {
    redis.close()
    throw new Error(err)
  }
}

export const get = async (key: string) => {
  const redis = await connect(options)

  try {
    const res = await redis.get(key)
    redis.close()
    return res
  } catch (err) {
    redis.close()
    throw new Error(err)
  }
}
