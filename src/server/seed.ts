import { createUser } from './data/users.data';
import { createStructure } from './data/structures.data';
import { createEntry } from './data/entries.data';
import * as uuid from 'uuid/v4';
import * as bcrypt from 'bcrypt-nodejs';

const user1 = {
  _id: uuid(),
  userName: 'blake',
  hashedPassword: bcrypt.hashSync('123'),
  isAdmin: true
};

const user2 = {
  _id: uuid(),
  userName: 'phil',
  hashedPassword: bcrypt.hashSync('456'),
  isAdmin: true
};

const user3 = {
  _id: uuid(),
  userName: 'notBlake',
  hashedPassword: bcrypt.hashSync('123'),
  isAdmin: false
};

const struct1 = {
  _id: '1',
  name: 'Structure 1',
  description: 'This is my first structure',
  fields: [
    {label: 'Label 1', type: 1},
    {label: 'Label 2', type: 1},
    {label: 'Label 3', type: 1},
    {label: 'Label 4', type: 1},
    {label: 'Label 5', type: 1}
  ]
};

const entry1 = {
  _id: '11',
  type: '1',
  title: 'My First Entry',
  description: 'This entry was seeded',
  author: user1,
  dateCreated: new Date(),
  fields: [
    {type: 1, label: 'Label 1', payload: 'This is some text'},
    {type: 1, label: 'Label 2', payload: '12345'},
    {type: 1, label: 'Label 3', payload: 'Hello, how are you?'},
    {type: 1, label: 'Label 4', payload: 'It\'s getting late'},
    {type: 1, label: 'Label 5', payload: 'This is the last field'}
  ],
  comments: [
    {comment: 'First!1!!1!!', timestamp: new Date(), user: user3}
  ]
};

createUser(user1);
createUser(user2);
createUser(user3);

createStructure(struct1);
createEntry(entry1);
