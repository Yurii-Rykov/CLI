const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, 'db/contacts.json');

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}  

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = await data.find(item => item.id === contactId);
  return result || null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    ...name,
    ...email,
    ...phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};