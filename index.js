const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

try {
  listContacts();
  // getContactById(9);
  // removeContact(5);
  // addContact("Anton", "a.chertok@akatech.com.ua", "+380667262367");
} catch (error) {
  console.log("Error catch->", error);
}
