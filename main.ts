import { Hono } from 'hono'
import { cors } from 'hono/cors'
import helloApp from '$/hello-routers.ts'
import redisApp from '$/redis-routers.ts'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: '*',
    allowHeaders: ['*'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['*'],
    maxAge: 600,
    credentials: false,
  }),
)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const routes = app
  .route('/hello', helloApp)
  .route('/redis', redisApp)

export type AppType = typeof routes

Deno.serve({ port: 8080 }, app.fetch)
