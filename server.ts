import app from '$/main.ts'

Deno.serve({ port: 8080 }, app.fetch)
