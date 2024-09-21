import { Hono } from 'hono'
import helloApp from '$/hello-routers.ts'
import redisApp from '$/redis-routers.ts'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const routes = app
  .route('/hello', helloApp)
  .route('/redis', redisApp)

export type AppType = typeof routes

Deno.serve({ port: 8080 }, app.fetch)
