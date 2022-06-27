import * as Effect from "@effect/core/io/Effect";
import * as Layer from "@effect/core/io/Layer";
import { pipe } from "@tsplus/stdlib/data/Function";
import { HttpServiceLive } from "./http.js";
import { TodoRepo, TodoRepoLive } from "./todos.js";

const main = Effect.gen(function* ($) {
  const { getTodosBetween } = yield* $(TodoRepo);

  const todos = yield* $(getTodosBetween(1, 10));

  for (const todo of todos) {
    yield* $(Effect.log(() => `Todo: ${JSON.stringify(todo)}`));
  }
});

const env = pipe(HttpServiceLive, Layer.andTo(TodoRepoLive));

pipe(main, Effect.provideSomeLayer(env), Effect.unsafeRunPromise);