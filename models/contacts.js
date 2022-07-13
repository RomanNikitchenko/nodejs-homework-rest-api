const { v4 } = require('uuid');
const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "contacts.json");

const updataContacts = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data));
};

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

const addContact = async ({name, email, phone}) => {
  const data = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await updataContacts(data);
  return newContact;
};

const removeContact = async (contactId) => {
  // const contacts = await listContacts();
  // const idx = contacts.findIndex(item => item.id === id);
  // if (idx === -1) {
  //   return null;
  // }
  // const newContacts = contacts.filter((_, index) => index !== idx);
  // await updataContacts(newContacts);
  // return contacts[idx];
};

const updateContact = async (contactId, { name, email, phone }) => {
  const data = await listContacts();
  const idx = data.findIndex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  data[idx] = { contactId, name, email, phone };
  await updataContacts(data);
  return data[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
