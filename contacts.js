const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("colors");

const contactsPath = path.resolve("./db/contacts.json");

const readContacts = async () => {
  const response = await fs.readFile("contactsPath", "utf-8");
  return JSON.parse(response);
};

const writeContacts = async (contacts) => {
  const data = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, data, "utf-8");
};

const listContacts = async () => {
  // const contacts = await readContacts();
  // console.log(contacts);

  try {
    const contacts = await readContacts();
    console.log(contacts);
  } catch (error) {
    console.log("ANTON ERRPR", error);
  }
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find(({ id }) => id === contactId.toString());
  console.log(contact);
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const newContacts = contacts.filter(({ id }) => id !== contactId.toString());
  await writeContacts(newContacts);
  // console.log(newContacts);
};

const addContact = async (name, email, phone) => {
  const contacts = await readContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  const newContacts = [...contacts, newContact];
  await writeContacts(newContacts);
};

module.exports = {
  // test,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// errors catch
// check if contact present in list - error
