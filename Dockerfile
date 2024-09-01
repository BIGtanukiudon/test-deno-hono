FROM denoland/deno:1.46.2

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter

WORKDIR /app

COPY deno.jsonc deno.lock main.ts routers.ts /app/

EXPOSE 8000
CMD ["deno", "task", "start"]