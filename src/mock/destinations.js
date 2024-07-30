import {getRandomArrayElement, getRandomNumber} from '../util/random-generator-util';

/**
 * Массив описаний
 * @return {Array}
 */
const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

/**
 * Массив городов
 * @return {Array}
 */
const cities = [
  'London', 'Paris', 'New York', 'Tokyo', 'Sydney', 'Rome', 'Berlin', 'Madrid',
  'Moscow', 'Cairo', 'Istanbul', 'Buenos Aires', 'Los Angeles', 'Chicago', 'Toronto',
  'Dubai', 'Singapore', 'Hong Kong', 'Mumbai', 'Delhi', 'Bangkok', 'Seoul', 'Shanghai',
  'Beijing', 'Osaka', 'Melbourne', 'Amsterdam', 'Barcelona', 'Florence', 'Venice',
  'Prague', 'Vienna', 'Budapest', 'Lisbon', 'Dublin', 'Edinburgh', 'Manchester',
  'Birmingham', 'Glasgow', 'Brussels', 'Copenhagen', 'Stockholm', 'Helsinki', 'Oslo',
  'Athens', 'Istanbul', 'Jerusalem', 'Riyadh', 'Doha', 'Abu Dhabi', 'Kuala Lumpur',
  'Jakarta', 'Manila', 'Ho Chi Minh City', 'Bangkok', 'Singapore', 'Taipei', 'Seoul',
  'Tokyo', 'Osaka', 'Kyoto', 'Nagoya', 'Sapporo', 'Fukuoka', 'Sendai', 'Hiroshima',
  'Yokohama', 'Kobe', 'Nagasaki', 'Kyoto', 'Chennai', 'Kolkata', 'Bangalore',
  'Hyderabad', 'Pune', 'Ahmedabad', 'Surat', 'Kanpur', 'Jaipur', 'Lucknow',
  'Mexico City', 'Guadalajara', 'Monterrey', 'Lima', 'Bogotá', 'Santiago',
  'Rio de Janeiro', 'São Paulo', 'Buenos Aires', 'Montevideo', 'Caracas',
  'San Francisco', 'Seattle', 'San Diego', 'Dallas', 'Houston', 'Phoenix',
  'Miami', 'Atlanta', 'Philadelphia', 'Boston', 'Washington D.C.', 'Detroit',
  'Minneapolis', 'Denver', 'St. Louis', 'New Orleans', 'Orlando', 'Las Vegas',
  'San Antonio', 'Cleveland', 'Indianapolis', 'Kansas City', 'Charlotte', 'Pittsburgh',
  'Cincinnati', 'Columbus', 'Milwaukee', 'Baltimore', 'Jacksonville', 'Oklahoma City',
  'Portland', 'Salt Lake City', 'Austin', 'El Paso', 'Tampa', 'Fort Worth', 'Raleigh',
  'Memphis', 'Louisville', 'Nashville', 'New York', 'Chicago', 'Los Angeles',
  'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Houston', 'Jacksonville', 'Indianapolis', 'San Francisco', 'Austin', 'Columbus',
  'Fort Worth', 'Charlotte', 'Denver', 'El Paso', 'Memphis', 'Baltimore', 'Boston',
  'Seattle', 'Washington D.C.', 'Milwaukee', 'Portland', 'Oklahoma City', 'Las Vegas',
  'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Long Beach', 'Mesa', 'Virginia Beach',
  'Atlanta', 'Colorado Springs', 'Raleigh', 'Omaha', 'Miami', 'New Orleans', 'Minneapolis',
  'Cleveland', 'Tampa', 'Kansas City', 'St. Louis', 'Pittsburgh', 'Cincinnati',
  'Orlando', 'Honolulu', 'Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan',
  'Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg',
  'Hamilton', 'Kitchener', 'London', 'Oshawa', 'Mississauga', 'Brampton', 'Burlington',
  'Cambridge', 'Markham', 'Richmond Hill', 'Vaughan', 'Whitby', 'Ajax', 'Pickering',
  'Aurora', 'Barrie', 'Gatineau', 'Sherbrooke', 'Laval', 'Longueuil', 'Trois-Rivières',
  'Victoriaville', 'Drummondville', 'Saguenay', 'Levis', 'Rimouski', 'Gaspé',
  'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Hobart',
  'Gold Coast', 'Newcastle', 'Wollongong', 'Cairns', 'Darwin', 'Townsville', 'Alice Springs'
];

/**
 * Получить изображения
 * @return {Array}
 */
const getPictures = () => {
  const count = getRandomNumber(1, 15);
  const pictures = [];
  for (let i = 0; i < count; i++) {
    pictures.push(
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 1000)}`,
        description: getRandomArrayElement(descriptions)
      }
    );
  }
  return pictures;
};

/**
 * Моки описаний
 * @return {Array}
 */
const mockDestinations = [
  {
    id: 'e7d13322-b09f-4268-8d10-4fbd98e0e1b1',
    description: getRandomArrayElement(descriptions),
    name: getRandomArrayElement(cities),
    pictures: getPictures()
  },
  {
    id: 'd560033f-446e-4f95-9041-e895ffbc58bf',
    description: getRandomArrayElement(descriptions),
    name: getRandomArrayElement(cities),
    pictures: []
  },
  {
    id: '9f2e4543-853b-478c-8b1e-59ffaa69f0fe',
    description: getRandomArrayElement(descriptions),
    name: getRandomArrayElement(cities),
    pictures: getPictures()
  },
  {
    id: '292a39bc-454e-4091-b9c2-bca3adbbb083',
    description: getRandomArrayElement(descriptions),
    name: getRandomArrayElement(cities),
    pictures: getPictures()
  },
  {
    id: 'eb9481f4-76a9-475b-b2d5-734433b58557',
    description: getRandomArrayElement(descriptions),
    name: getRandomArrayElement(cities),
    pictures: []
  },
  {
    id: '109c62f1-545f-496b-b31b-ea95ee473343',
    description: getRandomArrayElement(descriptions),
    name: getRandomArrayElement(cities),
    pictures: getPictures()
  },
  {
    id: '9a8dba22-658a-47b0-a19e-372517e2d27a',
    description: getRandomArrayElement(descriptions),
    name: getRandomArrayElement(cities),
    pictures: getPictures()
  },
  {
    id: '334fbec6-1969-4a42-b47b-ef15f0ce4a0e',
    description: getRandomArrayElement(descriptions),
    name: getRandomArrayElement(cities),
    pictures: []
  },
  {
    id: 'fe567e33-ba25-49c7-bb20-ba4ebad1d84e',
    description: getRandomArrayElement(descriptions),
    name: getRandomArrayElement(cities),
    pictures: getPictures()
  },
];

/**
 * Получить моки описаний
 * @public
 * @export
 * @function getMockDestinations
 * @return {Array}
 */
export const getMockDestinations = () => mockDestinations;
