import { ServerBuild } from "remix";
import { createEventHandler } from "@remix-run/cloudflare-workers";

import * as build from "../build/index.js";

addEventListener(
  "fetch",
  createEventHandler({ build: build as unknown as ServerBuild })
);

export class Object1 {
  constructor(state, env) {}

  async fetch(request) {
    return new Response("Hello World");
  }
}
