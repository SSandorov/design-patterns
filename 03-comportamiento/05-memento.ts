import { COLORS } from "../helpers/colors.ts";
/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

class GameMemento {
  private level: number;
  private health: number;
  private position: string;

  constructor(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;
  }

  getLevel() {
    return this.level;
  }

  getHealth() {
    return this.health;
  }
  getPosition() {
    return this.position;
  }
}

class Game {
  private level: number = 1;
  private health: number = 100;
  private position: string = "inicio";

  constructor(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(`
        Jugando en el nivel ${level}
        salud: ${health}
        posicion: ${position}`);
  }

  save(): GameMemento {
    return new GameMemento(this.level, this.health, this.position);
  }

  play(level: number, health: number, position: string): void {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(`
        Jugando en el nivel ${this.level}
        salud: ${this.health}
        posicion: ${this.position}`);
  }

  restore(memento: GameMemento): void {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    console.log(
      `
        \n%cProgreso restaurado:
        %cRestauracion en el nivel ${this.level}
        salud: ${this.health}
        posicion: ${this.position}`,
      COLORS.yellow,
      COLORS.blue
    );
  }
}

class GameHistory {
  private mementos: GameMemento[] = [];

  push(memento: GameMemento) {
    this.mementos.push(memento);
  }

  pop(): GameMemento | null {
    return this.mementos.pop() ?? null;
  }
}

function main() {
  const game = new Game(1, 100, "inicio");
  const history = new GameHistory();

  history.push(game.save());

  //Jugador avanza en el juego
  game.play(2, 90, "bosque encantado");
  history.push(game.save());

  //Jugador avanza en el juego
  game.play(3, 70, "cueva oscura");
  history.push(game.save());

  //Jugador avanza en el juego
  game.play(4, 50, "castillo del dragon");
  console.log("%c\nEstado actual", COLORS.green);

  game.restore(history.pop()!);
  console.log("\n%cDespues de restaurar el estado", COLORS.green);
}

main();
