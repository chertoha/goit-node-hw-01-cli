const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("colors");

const contactsPath = path.resolve("./db/contacts.json");

const readContacts = async () => {
  const response = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(response);
};

const writeContacts = async (contacts) => {
  const data = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, data, "utf-8");
};

const listContacts = async () => {
  try {
    const contacts = await readContacts();
    console.log(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readContacts();
    const contact = contacts.find(({ id }) => id === contactId.toString());
    console.log(contact);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readContacts();
    const newContacts = contacts.filter(
      ({ id }) => id !== contactId.toString()
    );
    await writeContacts(newContacts);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await readContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    await writeContacts([...contacts, newContact]);
    console.log(newContact);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
