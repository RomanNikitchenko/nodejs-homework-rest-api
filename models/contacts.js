const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "contacts.json");

// const updataContacts = async (data) => {
//   await fs.writeFile(filePath, JSON.stringify(data));
// };

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const idStr = String(contactId);
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === idStr);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
