import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <p>
        Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <ul>
        <li>
          <a href="/1.jpg">1</a>
        </li>
        <li>
          <a href="/2.jpg">2</a>
        </li>
        <li>
          <a href="/3.jpg">3</a>
        </li>
      </ul>
    </>
  );
}
