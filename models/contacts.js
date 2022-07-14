const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");

//получаем абсолютный адрес расположения файла contacts.json
const filePath = path.join(__dirname, "contacts.json");

//функция перезаписывает файл contacts.json
const updataContacts = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data));
};

//возвращает массив всех контактов в json-формате
const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

//возвращает объект контакта в json-формате
const getContactById = async (contactId) => {
  const idStr = String(contactId);
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === idStr);
  if (!contact) {
    return null;
  }
  return contact;
};

//добавляет новый контакт, возвращает объект нового контакта в json-формате
const addContact = async ({ name, email, phone }) => {
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

//удалени контакта, возвращает объект удаленного контакта в json-формате
const removeContact = async (contactId) => {
  const data = await listContacts();
  const idx = data.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = data.filter((_, index) => index !== idx);
  await updataContacts(newContacts);
  return data[idx];
};

//обновление контакта, возвращает обновленный объект контакта
const updateContact = async (id, { name, email, phone }) => {
  const data = await listContacts();
  const idx = data.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  data[idx] = { id, name, email, phone };
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
