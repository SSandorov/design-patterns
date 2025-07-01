/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */
interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHauntedHouse(hauntedHouse: HauntedHouse): void;
  visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
  accept(visitor: Visitor): void;
}

class RollerCoaster implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}

class HauntedHouse implements Attraction {
  private price: number = 40;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }
}

class FerrisWheel implements Attraction {
  private price: number = 30;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitFerrisWheel(this);
  }
}

// Visitors
class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `%cNino en montana rusa: %cPrecio con descuento de $${
        rollerCoaster.getPrice() * 0.5
      }`,
      COLORS.blue,
      COLORS.white
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `%cNino en casa del terror: %cPrecio con descuento de $${
        hauntedHouse.getPrice() * 0.7
      }`,
      COLORS.blue,
      COLORS.white
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `%cNino en la noria: %cPrecio con descuento de $${
        ferrisWheel.getPrice() * 0.6
      }`,
      COLORS.blue,
      COLORS.white
    );
  }
}
class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `%Adulto en montana rusa: %cPrecio con descuento de $${rollerCoaster.getPrice()}`,
      COLORS.blue,
      COLORS.white
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `%Adulto en casa del terror: %cPrecio con descuento de $${hauntedHouse.getPrice()}`,
      COLORS.blue,
      COLORS.white
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `%Adulto en la noria: %cPrecio con descuento de $${ferrisWheel.getPrice()}`,
      COLORS.blue,
      COLORS.white
    );
  }
}
class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `%Anciano en montana rusa: %cPrecio con descuento de $${
        rollerCoaster.getPrice() * 0.85
      }`,
      COLORS.blue,
      COLORS.white
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `%Anciano en casa del terror: %cPrecio con descuento de $${
        hauntedHouse.getPrice() * 0.85
      }`,
      COLORS.blue,
      COLORS.white
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `%Anciano en la noria: %cPrecio con descuento de $${
        ferrisWheel.getPrice() * 0.85
      }`,
      COLORS.blue,
      COLORS.white
    );
  }
}

function main() {
  const attractions: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel(),
  ];

  console.log("\n%cVisitante nino", COLORS.green);
  const childVisitor = new ChildVisitor();
  attractions.forEach((attraction) => attraction.accept(childVisitor));
}

main();
