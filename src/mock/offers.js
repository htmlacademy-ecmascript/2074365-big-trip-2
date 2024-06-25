import {getRandomNumber} from '../util/random-generator-util.js';

const mockOffers = [
  {
    type: 'taxi',
    'offers': [
      {
        'id': 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        'title': 'Online Taxi',
        'price': getRandomNumber(50, 300)
      },
      {
        'id': 'ad69464f-d0e5-4084-bd21-52716008dd4d',
        'title': 'Taxi with Car',
        'price': getRandomNumber(50, 300)
      },
      {
        'id': '985a0003-e00b-4a04-8c30-e1be1f109361',
        'title': 'Taxi for Pets',
        'price': getRandomNumber(50, 300)
      },
      {
        'id': '4d127689-7a1a-49af-b93c-2409964c1398',
        'title': 'Taxi Luggage',
        'price': getRandomNumber(50, 300)
      },
      {
        'id': '2bb2deae-3264-40ad-9998-982cf1b37c22',
        'title': 'Taxi with English',
        'price': getRandomNumber(50, 300)
      },
    ]
  },
  {
    type: 'bus',
    'offers': [
      {
        'id': 'a7239b99-0794-4661-a6d9-97a4242d5c8f',
        'title': 'Intercity Bus',
        'price': getRandomNumber(10, 250)
      },
      {
        'id': '19ef1fe1-ae6a-4dc3-b83c-e580a414d88c',
        'title': 'Tourist Bus Tours',
        'price': getRandomNumber(10, 250)
      },
      {
        'id': '5da404b7-787e-4a90-ad1a-27de26bd05fa',
        'title': 'Airport Transfer',
        'price': getRandomNumber(10, 250)
      },
      {
        'id': 'e549926e-59c2-4eee-b3cc-fc505ac535b5',
        'title': 'Night Bus',
        'price': getRandomNumber(10, 250)
      },
      {
        'id': 'a58654aa-1404-45e4-8ff7-a56abc64ada2',
        'title': 'City Bus Routes',
        'price': getRandomNumber(10, 250)
      },
    ]
  },
  {
    type: 'train',
    'offers': [
      {
        'id': '099358a4-6a34-4424-881d-dc916fd9ee18',
        'title': 'High Trains',
        'price': getRandomNumber(30, 450)
      },
      {
        'id': '75fde62c-4486-44a2-96a1-1d9057eea82f',
        'title': 'Intercity Trains',
        'price': getRandomNumber(30, 450)
      },
      {
        'id': '70b93dd7-8aad-4a94-9818-39a76a30967b',
        'title': 'Train with',
        'price': getRandomNumber(30, 450)
      },
      {
        'id': '98e9ecc3-f071-4182-8dc0-82a220154196',
        'title': 'Train with',
        'price': getRandomNumber(30, 450)
      },
      {
        'id': '62f87bbc-0fc6-42f5-9051-908e08a7877a',
        'title': 'Train Wi-Fi',
        'price': getRandomNumber(30, 450)
      },
    ]
  },
  {
    type: 'ship',
    'offers': [
      {
        'id': '1c64ca55-32e5-49c8-89e6-7f1cd6d2c1dc',
        'title': 'Cruise Ships',
        'price': getRandomNumber(500, 1500)
      },
      {
        'id': 'a12d4831-822f-42d6-a4e2-727d82675d2c',
        'title': 'Ferry Crossings',
        'price': getRandomNumber(500, 1500)
      },
      {
        'id': '6b58fc68-5e58-4a01-88e9-ac1942bfb47a',
        'title': 'Sea Excursions',
        'price': getRandomNumber(500, 1500)
      },
      {
        'id': '4b92d1ff-0e7f-48e3-8868-238f58cfe8fd',
        'title': 'Sea Fishing',
        'price': getRandomNumber(500, 1500)
      },
      {
        'id': '28f3f1f9-7735-4ac7-b079-6f3cd455327c',
        'title': 'Sunset Sea',
        'price': getRandomNumber(500, 1500)
      },
    ]
  },
  {
    type: 'drive',
    'offers': []
  },
  {
    type: 'flight',
    'offers': [
      {
        'id': '137a633d-c1ac-469b-909f-d046fb109e85',
        'title': 'International',
        'price': getRandomNumber(700, 2155)
      },
      {
        'id': '0c962aa7-30b2-43c0-837b-a391b11db662',
        'title': 'Flights',
        'price': getRandomNumber(700, 2155)
      },
      {
        'id': 'ba6bcd26-635c-49bc-b5e6-1902d0cae14c',
        'title': 'Charter Flights',
        'price': getRandomNumber(700, 2155)
      },
      {
        'id': 'f5f95ae0-95a8-42f1-af1a-58aa6caf16a5',
        'title': 'Online Flight',
        'price': getRandomNumber(700, 2155)
      },
      {
        'id': 'cf507d4e-9ad1-40ed-a27a-ed7bae4665a0',
        'title': 'Online Check',
        'price': getRandomNumber(700, 2155)
      },
    ]
  },
  {
    type: 'check-in',
    'offers': []
  },
  {
    type: 'sightseeing',
    'offers': [
      {
        'id': 'd21f6331-19d6-4063-8c73-0b9e58fe9ad9',
        'title': 'Guided Tours',
        'price': getRandomNumber(500, 700)
      }
    ]
  },
  {
    type: 'restaurant',
    'offers': [
      {
        'id': '5e309c51-6296-4aee-9b17-29559792b1ca',
        'title': 'Online Table',
        'price': getRandomNumber(100, 785)
      },
      {
        'id': 'a7f39dcb-e282-494e-89f7-cfe73cfcbd8b',
        'title': 'Food Delivery',
        'price': getRandomNumber(100, 785)
      }
    ]
  }
];

export const getMockOffers = () => mockOffers;
