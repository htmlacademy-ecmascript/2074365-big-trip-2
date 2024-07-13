import {getRandomNumber} from '../util/random-generator-util.js';

/**
 * Моки точек
 * @return {Array}
 */
const mockPoints = [
  {
    id: 'e171cfc7-b557-4f37-8cc3-fd84e9a0f6f4',
    basePrice: getRandomNumber(100, 700),
    dateFrom: '2024-01-01T12:12:12.845Z',
    dateTo: '2024-01-10T10:15:11.143Z',
    destination: 'e7d13322-b09f-4268-8d10-4fbd98e0e1b1',
    isFavorite: true,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      '4d127689-7a1a-49af-b93c-2409964c1398',
      '2bb2deae-3264-40ad-9998-982cf1b37c22'
    ],
    type: 'taxi'
  },
  {
    id: '832bc9c9-08c4-4531-9ede-84fe829f9c8b',
    basePrice: getRandomNumber(10, 100),
    dateFrom: '2024-02-11T09:10:11.135Z',
    dateTo: '2024-02-21T21:11:14.447Z',
    destination: 'd560033f-446e-4f95-9041-e895ffbc58bf',
    isFavorite: false,
    offers: [
      '19ef1fe1-ae6a-4dc3-b83c-e580a414d88c',
      '5da404b7-787e-4a90-ad1a-27de26bd05fa',
      'a58654aa-1404-45e4-8ff7-a56abc64ada2'
    ],
    type: 'bus'
  },
  {
    id: '11b5bb77-09f2-44e3-8ac6-961e35debf53',
    basePrice: getRandomNumber(500, 1100),
    dateFrom: '2024-03-20T01:34:11.443Z',
    dateTo: '2024-03-24T07:18:19.254Z',
    destination: '9f2e4543-853b-478c-8b1e-59ffaa69f0fe',
    isFavorite: false,
    offers: [
      '75fde62c-4486-44a2-96a1-1d9057eea82f',
      '70b93dd7-8aad-4a94-9818-39a76a30967b',
      '98e9ecc3-f071-4182-8dc0-82a220154196',
    ],
    type: 'train'
  },
  {
    id: 'd3403e07-c2f9-4e76-96df-e61fe4ebcfba',
    basePrice: getRandomNumber(500, 4000),
    dateFrom: '2024-04-01T12:00:00.343Z',
    dateTo: '2024-04-20T07:15:00.854Z',
    destination: '292a39bc-454e-4091-b9c2-bca3adbbb083',
    isFavorite: false,
    offers: [
      '1c64ca55-32e5-49c8-89e6-7f1cd6d2c1dc',
      'a12d4831-822f-42d6-a4e2-727d82675d2c',
      '4b92d1ff-0e7f-48e3-8868-238f58cfe8fd',
    ],
    type: 'ship'
  },
  {
    id: 'b03df61a-48a6-43c8-996a-2415084b71fe',
    basePrice: getRandomNumber(100, 1000),
    dateFrom: '2024-04-28T10:00:00.343Z',
    dateTo: '2024-05-15T17:33:00.354Z',
    destination: 'eb9481f4-76a9-475b-b2d5-734433b58557',
    isFavorite: false,
    offers: [],
    type: 'drive'
  },
  {
    id: 'c88d4b70-9c72-497e-a73a-de73506a33b0',
    basePrice: getRandomNumber(300, 1500),
    dateFrom: '2024-05-17T08:30:00.745Z',
    dateTo: '2024-05-17T12:00:00.157Z',
    destination: '109c62f1-545f-496b-b31b-ea95ee473343',
    isFavorite: false,
    offers: [
      '0c962aa7-30b2-43c0-837b-a391b11db662',
      'ba6bcd26-635c-49bc-b5e6-1902d0cae14c',
    ],
    type: 'flight'
  },
  {
    id: '21d178cb-4aed-4f60-8b00-870b3248c1c8',
    basePrice: getRandomNumber(150, 500),
    dateFrom: '2024-05-17T14:00:00.745Z',
    dateTo: '2024-05-20T12:00:00.157Z',
    destination: '9a8dba22-658a-47b0-a19e-372517e2d27a',
    isFavorite: false,
    offers: [],
    type: 'check-in'
  },
  {
    id: '3d70845b-7891-4f55-8a01-9debb880ba60',
    basePrice: getRandomNumber(80, 300),
    dateFrom: '2024-05-20T17:30:00.745Z',
    dateTo: '2024-05-20T17:41:03.745Z',
    destination: '334fbec6-1969-4a42-b47b-ef15f0ce4a0e',
    isFavorite: false,
    offers: [
      'd21f6331-19d6-4063-8c73-0b9e58fe9ad9'
    ],
    type: 'sightseeing'
  },
  {
    id: 'b93effe0-e192-404f-a7cc-9871fdd2465f',
    basePrice: getRandomNumber(100, 1000),
    dateFrom: '2024-05-21T18:45:00.145Z',
    dateTo: '2024-05-21T19:00:00.483Z',
    destination: 'fe567e33-ba25-49c7-bb20-ba4ebad1d84e',
    isFavorite: false,
    offers: [
      '5e309c51-6296-4aee-9b17-29559792b1ca'
    ],
    type: 'restaurant'
  }
];

/**
 * Получить все точки
 * @public
 * @export
 * @function getPoints
 * @return {Array}
 */
export const getPoints = () => mockPoints;
