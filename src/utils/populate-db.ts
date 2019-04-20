import { database, initializeApp } from 'firebase';
import { environment } from '../environments/environment';
import { places } from './places-db';
import { Place } from '../app/models/place';

initializeApp(environment.firebaseConfig);

// async function populate(name: string, data: any[]): Promise<any> {
//   const ref = database().ref(name);
//   await ref.set(null);

//   const promises = data.map(i => {
//     const key = ref.push(i).key;
//     i.id = key;
//     return ref.update({ [`/${key}`]: i });
//   });
//   return Promise.all(promises);
// }

// async function populateAll() {
//   await populate('places', places);

//   console.log('🔥 db populated 🔥');
//   process.exit();
// }

async function moveImages() {
  const ref = database().ref('images');
  ref.set(null);
  let data = await database()
    .ref('places')
    .once('value')
    .then(data => data.val());

  const images = Object.keys(data).map(key => ({ id: key, image: data[key].image }));
  const promises = images.map(image => ref.child(image.id).set({ image: image.image }));
  Promise.all(promises).then(_ => {
    console.log('success');
    process.exit();
  });
}

moveImages();
