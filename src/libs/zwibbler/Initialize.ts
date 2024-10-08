import { MainScope, ZwibblerClass, ZwibblerContext } from './zwibbler-def';

declare let Zwibbler: ZwibblerClass;

type StartupInitializerfn = (Zwibbler: ZwibblerClass) => void;
type ContextInitializerFn<
  Scope extends MainScope,
  Context extends ZwibblerContext,
> = (scope: Scope, context: Context) => void;

class ZwibblerInitializerClass<
  Scope extends MainScope,
  Context extends ZwibblerContext,
> {
  private startupInitializers: StartupInitializerfn[] = [];
  private contextInitializers: ContextInitializerFn<Scope, Context>[] = [];
  private started = false;

  onStartup(fn: StartupInitializerfn) {
    this.startupInitializers.push(fn);
  }

  onNewInstance(fn: ContextInitializerFn<Scope, Context>) {
    this.contextInitializers.push(fn);
  }

  start() {
    if (this.started) {
      return;
    }
    this.started = true;
    this.startupInitializers.forEach((fn) => fn(Zwibbler));
  }

  initNewInstance(scope: Scope, context: Context) {
    if (!this.started) {
      throw new Error(
        `You must call ZwibblerInitializer.start() before calling ZwibblerInitializer.initNewInstance()`
      );
    }
    this.contextInitializers.forEach((fn) => fn(scope, context));
  }
}

export const ZwibblerInitializer = new ZwibblerInitializerClass<
  MainScope,
  ZwibblerContext
>();
