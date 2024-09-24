import {getRandomNumber} from '../util/common';

/** Моки точек событий */
const mockEvents = [
  {
    id: '1',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-06-12T17:55:56'),
    dateTo: new Date('2024-06-14T10:15:23'),
    destination: 1,
    isFavorite: false,
    offers: [1],
    type: 'flight'
  },
  {
    id: '2',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-06-18T18:25:56'),
    dateTo: new Date('2024-06-18T19:50:13'),
    destination: 2,
    isFavorite: true,
    offers: [2],
    type: 'taxi'
  },
  {
    id: '3',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-09-17T01:25:56'),
    dateTo: new Date('2024-09-21T22:50:14'),
    destination: 4,
    isFavorite: true,
    offers: [1],
    type: 'bus'
  },
  {
    id: '4',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-09-12T12:25:56'),
    dateTo: new Date('2024-09-17T15:50:13'),
    destination: 4,
    isFavorite: true,
    offers: [1, 2],
    type: 'train'
  },
  {
    id: '5',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-12-10T12:28:56'),
    dateTo: new Date('2024-12-10T17:50:17'),
    destination: 5,
    isFavorite: true,
    offers: [1, 2],
    type: 'check-in'
  },
  {
    id: '6',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-06-10T17:25:56'),
    dateTo: new Date('2024-06-10T17:50:11'),
    destination: 1,
    isFavorite: true,
    offers: [1, 2],
    type: 'check-in'
  },
  {
    id: '7',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-04-10T16:25:56'),
    dateTo: new Date('2024-05-14T18:50:17'),
    destination: 2,
    isFavorite: true,
    offers: [2],
    type: 'sightseeing'
  },
  {
    id: '8',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-02-10T17:25:56'),
    dateTo: new Date('2024-02-11T17:14:16'),
    destination: 4,
    isFavorite: true,
    offers: [1, 2],
    type: 'ship'
  },
  {
    id: '9',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-03-10T16:25:56'),
    dateTo: new Date('2024-03-11T17:50:11'),
    destination: 5,
    isFavorite: true,
    offers: [1, 2],
    type: 'taxi'
  },
  {
    id: '10',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-10-10T16:25:56'),
    dateTo: new Date('2024-10-10T17:50:13'),
    destination: 4,
    isFavorite: true,
    offers: [1, 2],
    type: 'drive'
  },
  {
    id: '11',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-02-10T21:25:56'),
    dateTo: new Date('2024-02-11T22:52:17'),
    destination: 5,
    isFavorite: true,
    offers: [1, 2],
    type: 'ship'
  },
  {
    id: '12',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-08-10T18:25:56'),
    dateTo: new Date('2024-08-11T14:50:17'),
    destination: 1,
    isFavorite: true,
    offers: [1],
    type: 'sightseeing'
  },
  {
    id: '13',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-12-21T17:25:56'),
    dateTo: new Date('2024-12-30T22:57:18'),
    destination: 3,
    isFavorite: true,
    offers: [2],
    type: 'sightseeing'
  },
  {
    id: '14',
    basePrice: getRandomNumber(),
    dateFrom: new Date('2024-09-17T03:44:56'),
    dateTo: new Date('2024-09-27T21:50:14'),
    destination: 1,
    isFavorite: true,
    offers: [1, 3],
    type: 'bus'
  }
];

/** Получить точки событий */
export function getEvents() {
  return mockEvents;
}
