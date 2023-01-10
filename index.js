const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// getContactById(5);
// removeContact(5);
// addContact("ff444sss", "asd@asd", "2231232");
// listContacts();

// console.log(process.argv);

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      if (!id) {
        console.warn("\x1B[31m You didn't specify 'id'");
        break;
      }
      getContactById(id);
      break;

    case "add":
      if (!name || !email || !phone) {
        console.warn(
          "\x1B[31m You didn't specify one or more parameters [name, email, phone]"
        );

        break;
      }
      addContact(name, email, phone);
      break;

    case "remove":
      if (!id) {
        console.warn("\x1B[31m You didn't specify 'id'");
        break;
      }
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!!!");
  }
}

invokeAction(argv);
