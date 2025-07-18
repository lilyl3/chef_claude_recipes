FROM node:24 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm install react-markdown@8.0.6
RUN npm run build
# after build, static files live in /app/dist

FROM nginx:1.29.0
COPY --from=builder /app/dist /usr/share/nginx/html
# without --from=builder, Docker will try to copy from local host's filesystem

# # /etc/nginx/nginx.conf ---> nginx's main config file
# # that contains `include /etc/nginx/conf.d/*.conf;`
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# run in the foreground to keep server alive