import { Handlers, PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";

export interface ThisAndNext {
  thisPhoto: string;
  nextPhoto: string;
}

export async function getRandomPhoto(): Promise<string> {
  const dir = "static/images";

  const photos: string[] = [];

  // Check that our directory _really is_ a directory.
  const dirStats = await Deno.lstat(dir);

  // If it's not, then we throw 'Not Found'.
  if (!dirStats.isDirectory) {
    throw new Deno.errors.NotFound(`${dir} is not a directory.`);
  }

  // Now we know it's real, we can read its contents.
  for await (const dirEntry of Deno.readDir(dir)) {
    // We take all of the (not hidden) images in the root of our photo store.
    if (dirEntry.isFile && !dirEntry.name.startsWith('.')) {
      photos.push(dirEntry.name);
    }
  }

  // Pick an entry at random.
  const randomIdx = Math.floor(Math.random() * photos.length);

  // Return the random photo.
  return photos[randomIdx];
}

export const handler: Handlers<ThisAndNext> = {
  async GET(_req, ctx) {
    const thisPhoto = ctx.params.photo;
    const nextPhoto = await getRandomPhoto();

    const thisNext = {
      thisPhoto,
      nextPhoto,
    };

    return ctx.render(thisNext);
  },
};

export default function Photo(props: PageProps<ThisAndNext>) {
  return (
    <html>
      <head>
        <link href="/main.css" rel="stylesheet" />
        <meta http-equiv="refresh" content={`3;url=/${props.data.nextPhoto}`} />
        <link rel="prefetch" href={props.data.nextPhoto} />
        <link rel="prefetch" href={asset(`/images/${props.data.nextPhoto}`)} />
      </head>
      <body>
        <img class="background" src={`/images/${props.data.thisPhoto}`} />
        <img class="foreground" src={`/images/${props.data.thisPhoto}`} />
      </body>
    </html>
  );
}
