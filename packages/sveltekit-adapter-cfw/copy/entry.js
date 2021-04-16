import { init, render } from "../output/server/app.js"; // eslint-disable-line import/no-unresolved
import { getAssetFromKV, NotFoundError } from "@cloudflare/kv-asset-handler"; // eslint-disable-line import/no-unresolved
import { isContentTypeTextual } from "@sveltejs/kit/adapter-utils"; // eslint-disable-line import/no-unresolved

init();

addEventListener("fetch", (event) => {
  event.respondWith(handle(event));
});

async function handle(event) {
  if (event.request.method == "GET") {
    try {
      return await getAssetFromKV(event);
    } catch (e) {
      if (!(e instanceof NotFoundError)) {
        return new Response(
          "Error loading static asset:" + (e.message || e.toString()),
          {
            status: 500,
          }
        );
      }
    }
  }

  const request = event.request;
  const request_url = new URL(request.url);

  try {
    const rendered = await render({
      host: request_url.host,
      path: request_url.pathname,
      query: request_url.searchParams,
      rawBody: request.body ? await read(request) : null,
      headers: Object.fromEntries(request.headers),
      method: request.method,
    });

    if (rendered) {
      return new Response(rendered.body, {
        status: rendered.status,
        headers: rendered.headers,
      });
    }
  } catch (e) {
    return new Response(
      "Error rendering route:" + (e.message || e.toString()),
      { status: 500 }
    );
  }

  return new Response({
    status: 404,
    statusText: "Not Found",
  });
}

async function read(request) {
  const type = request.headers.get("content-type") || "";
  if (isContentTypeTextual(type)) {
    return request.text();
  }

  return new Uint8Array(await request.arrayBuffer());
}
