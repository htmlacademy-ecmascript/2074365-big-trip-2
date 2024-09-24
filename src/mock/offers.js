import {getRandomNumber} from '../util/common.js';

/** Моки офферов (пердложений) */
export const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Online Taxi',
        'price': getRandomNumber()
      },
      {
        'id': 2,
        'title': 'Taxi with Car',
        'price': getRandomNumber()
      },
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 1,
        'title': 'International',
        'price': getRandomNumber()
      },
      {
        'id': 2,
        'title': 'Charter Flights',
        'price': getRandomNumber()
      },
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 1,
        'title': 'High Trains',
        'price': getRandomNumber()
      },
      {
        'id': 2,
        'title': 'Train Wi-Fi',
        'price': getRandomNumber()
      },
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 1,
        'title': 'Cruise Ships',
        'price': getRandomNumber()
      },
      {
        'id': 2,
        'title': 'Sea Excursions',
        'price': getRandomNumber()
      },
    ]
  },
  {
    'type': 'drive',
    'offers': []
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 1,
        'title': 'Airport Transfer',
        'price': getRandomNumber()
      },
      {
        'id': 2,
        'title': 'Night Bus',
        'price': getRandomNumber()
      },
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': 1,
        'title': 'Online Table',
        'price': getRandomNumber()
      },
      {
        'id': 2,
        'title': 'Food Delivery',
        'price': getRandomNumber()
      },
    ]
  },
  {
    'type': 'check-in',
    'offers': []
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'id': 1,
        'title': 'Guided Tours',
        'price': getRandomNumber()
      }
    ]
  }
];
