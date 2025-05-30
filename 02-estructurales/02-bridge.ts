import { COLORS } from "../helpers/colors.ts";
/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

interface Ability {
  use(): void;
}

class SwordAttack implements Ability {
  use(): void {
    console.log("%cAtaca con la espada", COLORS.red);
  }
}

class AxeAttack implements Ability {
  use(): void {
    console.log("%cAtaca con el hacha", COLORS.red);
  }
}

class MagicSpell implements Ability {
  use(): void {
    console.log("%cAtaca con el hechizo", COLORS.blue);
  }
}

abstract class Character {
  protected ability: Ability;

  constructor(ability: Ability) {
    this.ability = ability;
  }

  setAbility(ability: Ability) {
    this.ability = ability;
  }

  abstract performAbility(): void;
}

class Warrior extends Character {
  override performAbility(): void {
    console.log("El guerrero va a luchar");
    this.ability.use();
  }
}

class Mage extends Character {
  override performAbility(): void {
    console.log("El mago va a luchar");
    this.ability.use();
  }
}

function main() {
  const warrior = new Warrior(new SwordAttack());
  warrior.performAbility();

  warrior.setAbility(new AxeAttack());
  warrior.performAbility();

  const mage = new Mage(new MagicSpell());
  mage.performAbility();
}

main();
