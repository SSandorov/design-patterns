import { COLORS } from "../helpers/colors.ts";
/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

class User {
  private username: string;
  private chatRoom: Chatroom;

  constructor(username: string, chatRoom: Chatroom) {
    this.username = username;
    this.chatRoom = chatRoom;

    chatRoom.addUser(this);
  }

  sendMessage(message: string): void {
    console.log(
      `\n\n%c${this.username} envia: %c${message}`,
      COLORS.blue,
      COLORS.white
    );
    this.chatRoom.sendMessage(this, message);
  }
  receiveMessage(sender: User, message: string): void {
    console.log(
      `%c${this.username} recibe de ${sender.username}: %c${message}`,
      COLORS.blue,
      COLORS.white
    );
  }
}
class Chatroom {
  private users: User[] = [];
  public title: string;

  constructor(title: string) {
    this.title = title;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string): void {
    const usersToSend = this.users.filter((user) => user !== sender);
    for (const user of usersToSend) {
      if (user !== sender) {
        user.receiveMessage(sender, message);
      }
    }
  }
}

function main() {
  const chatRoom = new Chatroom("grupo de trabajo");

  const user1 = new User("Fernando", chatRoom);
  const user2 = new User("Gaston", chatRoom);
  const user3 = new User("Miguel", chatRoom);

  user1.sendMessage("Hola a todos");
  user2.sendMessage("Hola Fernando, como estas?");
  user3.sendMessage("Buenas! como estan?");

  console.log("\n\n");
}

main();
