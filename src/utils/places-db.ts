import { Place } from '../app/models/place';
import { images } from './images';

export const places: Place[] = [
  {
    title: 'Рабицчка',
    description: 'Покойся с миром, немного элитарное пристанище техно-тусеров',
    category: 'music',
    image: images.rabitsa
  },
  {
    category: 'nature',
    title: 'Казбеги, Степанцмида',
    description:
      'Маленький горный поселок в Грузии. Если подняться высоко, начинаешь чувствовать мир :) Плюс, крайне приветливые жители, предлагающие остаться с ними и кататься на лошадях',
    image: images.kazbegi
  },
  {
    category: 'nature',
    title: 'Чугунка',
    description:
      'Воспоминания из детства, прогулки по рельсам и потерянным тропинкам, разговоры, гитары, песни, немного любви и алкоголя, романтика городских окраин :) Ну и вид на реку там просто супер',
    image: images.chugunka
  },
  {
    category: 'movies',
    title: 'Соловей',
    description: 'Кино дешево и даже с субтитрами!',
    image: images.solovei
  },
  {
    category: 'coffee',
    title: "Jeffrey's",
    description:
      'Раньше любила антикафе и считала Джеффри крутым местом, но там много людей, мало мест и уединения, особенно на Арбате:(',
    image: images.jeffrey
  },
  {
    category: 'nightlife',
    title: 'Клуб "Агломерат"',
    description: 'Свидетель множества ныне умеревших вичуганских тус. Огромные очереди с огромными охранниками',
    image: images.aglomerat
  },
  {
    category: 'nightlife',
    title: 'Клуб "Pluton"',
    description: 'Весьма андеграундное место, особенно благодаря потертому столбу метрополитена',
    image: images.pluton
  },
  {
    category: 'drinks',
    title: 'Бар "Parka"',
    description: 'Клевое место на Тургеневской с симпатичными шишками',
    image: images.parka
  },
  {
    category: 'food',
    title: 'Томато',
    description:
      'Когда вы в Ефремове, там холодно, голодно и ни у кого нет свободной хаты, единственный выход - "Го в томату!"(также имеется загон для детей)',
    image: images.tomato
  },
  {
    category: 'other',
    title: 'Офис Mail.ru Group',
    description:
      'Очень гуд там сидеть пить кофеек и сок, валяться на пуфиках, в общем антикафе только бесплатно(когда ваш друг там работает)',
    image: images.mail
  }
];
