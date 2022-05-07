import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Add to the database');

// Create a connection to the db and set privileges (read/write bc its a put) //
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the object store and use add() to add content. //
  const store = tx.objectStore('jate');
  const request = store.add({ content });

  //Log confirmation // 
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');

  
  const store = tx.objectStore('jate');

  // Use readonly because we are performing a get request //
  const request = store.get(1);

  
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();