FROM denoland/deno:1.46.2

WORKDIR /app

COPY deno.json deno.lock main.ts /app/

CMD ["deno", "task", "start"]