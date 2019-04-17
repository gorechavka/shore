import { database, initializeApp } from 'firebase';
import { environment } from '../environments/environment';
import { categories } from './categories';

initializeApp(environment.firebaseConfig);

async function populate(name: string, data: any[]): Promise<any> {
  const ref = database().ref(name);
  await ref.set(null);

  const promises = data.map(i => {
    const key = ref.push(i).key;
    i.id = key;
    return ref.update({ [`/${key}`]: i });
  });
  return Promise.all(promises);
}

async function populateAll(categories) {
  let counter = 0;
  let length = Object.keys(categories).length;
  for (let c in categories) {
    populate(c, categories[c]).then(_ => {
      if (++counter >= length) {
        console.log('🔥 db populated 🔥');
        process.exit();
      }
    });
  }
}

populateAll(categories);
