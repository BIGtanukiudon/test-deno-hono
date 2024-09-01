FROM denoland/deno:1.46.2

WORKDIR /app

COPY deno.jsonc deno.lock main.ts routers.ts /app/

EXPOSE 8000
CMD ["deno", "task", "start"]