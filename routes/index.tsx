import { Handlers, PageProps } from "$fresh/server.ts";
import Photo, { getRandomPhoto, ThisAndNext, handler as photoHandler } from "./[photo].tsx";

export const handler: Handlers<ThisAndNext> = {
  async GET(_req, ctx) {
    // Since this is the 'index' page, we just need to pick a random
    // photo...
    ctx.params.photo = await getRandomPhoto();

    // and inject it in to the photo page's handler.
    return await photoHandler.GET!(_req,ctx);
  },
};

export default function Index(props: PageProps<ThisAndNext>) {
  // Just steal the HTML from the photo page.
  return Photo(props);
}
