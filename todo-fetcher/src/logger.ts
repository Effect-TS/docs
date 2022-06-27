import * as Effect from "@effect/core/io/Effect";
import { LazyArg } from "@tsplus/stdlib/data/Function";
import { Service } from "@tsplus/stdlib/service/Service";

export interface LoggerService
  extends Effect.Effect.Success<typeof makeLoggerService> {}

export const LoggerService = Service.Tag<LoggerService>();

export const makeLoggerService = Effect.succeed(() => {
  const log = (message: LazyArg<string>) =>
    Effect.succeed(() => console.log(message()));

  return {
    log,
  };
});

export const LoggerServiceLive =
  Effect.toLayer(LoggerService)(makeLoggerService);