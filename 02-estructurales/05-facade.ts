import { COLORS } from "../helpers/colors.ts";
/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */
class Projector {
  turnOn() {
    console.log("Proyector encendido");
  }

  turnOff() {
    console.log("Proyector apagado");
  }
}

class SoundSystem {
  on() {
    console.log("Sistema de sonido encendido");
  }

  off() {
    console.log("Sistema de sonido apagado");
  }
}

class VideoPLayer {
  on() {
    console.log("Video player encendido");
  }

  play(movie: string) {
    console.log(`Reproduciendo %c${movie}`, COLORS.blue);
  }

  stop() {
    console.log("Pelicula detenida");
  }

  off() {
    console.log("Video player apagado");
  }
}

class PopcornMaker {
  poppingPopcorn() {
    console.log("Haciendo palomitas");
  }

  turnOffPoppingPopcorn() {
    console.log("Palomitas hechas");
  }
}

interface HomeTheaterFacadeConstructor {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPLayer: VideoPLayer;
  popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPLayer: VideoPLayer;
  private popcornMaker: PopcornMaker;

  constructor({
    projector,
    soundSystem,
    videoPLayer,
    popcornMaker,
  }: HomeTheaterFacadeConstructor) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPLayer = videoPLayer;
    this.popcornMaker = popcornMaker;
  }

  watchMovie(movie: string): void {
    console.log("%cPreparando para ver la pelicula", COLORS.blue);
    this.projector.turnOn();
    this.soundSystem.on();
    this.videoPLayer.on();
    this.videoPLayer.play(movie);

    console.log("%cDisfrute la pelicula", COLORS.blue);
  }

  endWatchingMovie(): void {
    console.log("%cPreparando para parar la pelicula", COLORS.blue);
    this.projector.turnOff();
    this.soundSystem.off();
    this.videoPLayer.off();
    this.videoPLayer.stop();
    this.videoPLayer.off();

    console.log("%cSesion terminada", COLORS.blue);
  }
}

function main() {
  const projector = new Projector();
  const soundSystem = new SoundSystem();
  const videoPLayer = new VideoPLayer();
  const popcornMaker = new PopcornMaker();

  const chillSunday = new HomeTheaterFacade({
    projector,
    soundSystem,
    videoPLayer,
    popcornMaker,
  });

  chillSunday.watchMovie("Agents of SHIELD");
  chillSunday.endWatchingMovie();
}

main();
