import { database, initializeApp } from 'firebase';
import { environment } from '../environments/environment';
import { places } from './places-db';

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

async function populateAll() {
  await populate('places', places);

  console.log('🔥 db populated 🔥');
  process.exit();
}

populateAll();
