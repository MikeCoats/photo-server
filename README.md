# photo-server

## Deployment

Build the docker image:

```sh
docker build \
    --build-arg GIT_REVISION=$(git rev-parse HEAD) \
    --tag photo-server \
    .
```

Serve a folder full of jpgs:

```sh
docker run \
    --detach \
    --name photo-server \
    --publish 8000:8000 \
    --volume "/home/your-user/photos/2021 New Year's Eve:/app/static/images" \
    photo-server
```

## Development

Start the project:

```sh
deno task start
```
