/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

import { COLORS } from "../helpers/colors.ts";

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}

abstract class BaseHandler implements Handler {
  private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

// Soporte basico
class BasicSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "basic") {
      console.log("%cSoporte basico resolviendo el problema", COLORS.green);
      return;
    }

    console.log("%cPasando el problema al soporte avanzado", COLORS.red);
    super.handle(request);
  }
}

//Soporte avanzado
class AdvancedSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "advanced") {
      console.log("%cSoporte avanzado resolviendo el problema", COLORS.yellow);
      return;
    }

    console.log("%cPasando el problema al soporte experto", COLORS.red);
    super.handle(request);
  }
}

//Soporte experto
class ExpertSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "expert") {
      console.log("%cSoporte experto resolviendo el problema", COLORS.blue);
      return;
    }

    console.log("%cNo se puede solucionar", COLORS.red);
  }
}

function main() {
  const problem = "advanced";

  const basicSupport = new BasicSupport();
  const advancedSupport = new AdvancedSupport();
  const expertSupport = new ExpertSupport();

  basicSupport.setNext(advancedSupport).setNext(expertSupport);

  basicSupport.handle("advanced");
  console.log("\n");
  basicSupport.handle("pesado");
}

main();
