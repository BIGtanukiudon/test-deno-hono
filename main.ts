import { Hono } from 'hono'
import helloApp from '$/hello-routers.ts'
import redisApp from '$/redis-routers.ts'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/hello', helloApp)
app.route('/redis', redisApp)

Deno.serve({ port: 8080 }, app.fetch)
