// Mock Database Seed Data for RentEase matching the screenshots

export const DEFAULT_LISTINGS = [
  {
    id: 1,
    title: 'Dhaka Rent',
    location: 'BUBT Campus (0.4 miles)',
    price: 1250,
    type: 'Entire Apartment',
    facilities: ['Wifi Included', 'Furnished', 'Gym'],
    verified: true,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
    description: 'Perfect student apartment near BUBT. Fully furnished with a bed, desk, and high-speed fiber internet.',
    landlord: {
      name: 'Mehadi',
      rating: 4.9,
      phone: '+880 1712-345678'
    },
    reviews: [
      { author: 'Ashik', rating: 5, date: 'Oct 2023', comment: 'Amazing student flat, extremely close to BUBT! Utilities are fully bundled and fiber wifi is super fast. Highly recommended.' }
    ]
  },
  {
    id: 2,
    title: 'Mirpur House',
    location: 'Mirpur 10, CA',
    price: 850,
    type: 'Private Room',
    facilities: ['Private Bath', 'In-unit Laundry'],
    verified: true,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    description: 'Quiet room in a friendly shared flat. Close to transport and BUBT. Friendly roommate environment.',
    landlord: {
      name: 'Abdur Rahman',
      rating: 4.7,
      phone: '+880 1819-876543'
    },
    reviews: []
  },
  {
    id: 3,
    title: 'Mirpur 11',
    location: 'BUBT',
    price: 920,
    type: 'Shared Room',
    facilities: ['Rooftop Deck', 'Wifi'],
    verified: false,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
    description: 'Private sublet room in family apartment. Safe and quiet environment for students.',
    landlord: {
      name: 'Mrs. Begum',
      rating: 4.5,
      phone: '+880 1911-223344'
    },
    reviews: []
  },
  {
    id: 4,
    title: 'Mirpur 6',
    location: 'BUBT',
    price: 1400,
    type: 'Entire Apartment',
    facilities: ['Smart Home', 'Quiet Zone'],
    verified: true,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
    description: 'Premium student living with smart facilities. Ideal for study groups.',
    landlord: {
      name: 'Apex Student Living',
      rating: 4.8,
      phone: '+880 1515-667788'
    },
    reviews: []
  }
];

export const MOCK_ROOMMATES = [
  {
    name: 'Bushra',
    gender: 'Female',
    intake: '51/8',
    budget: 5000,
    cleanliness: 'Very Neat',
    study: 'Quiet library setting',
    sleep: 'Early riser',
    smoke: 'Non-smoker',
    bio: 'Biology major. Love weekend hikes and quiet study sessions. Very organized!'
  },
  {
    name: 'Anas',
    gender: 'Male',
    intake: '51/8',
    budget: 6500,
    cleanliness: 'Moderate',
    study: 'Group study',
    sleep: 'Night owl',
    smoke: 'Non-smoker',
    bio: 'Computer Science. I spend a lot of time coding. Looking for a chill environment.'
  },
  {
    name: 'Shimu',
    gender: 'Female',
    intake: '51/8',
    budget: 6000,
    cleanliness: 'Very Neat',
    study: 'Quiet library setting',
    sleep: 'Early riser',
    smoke: 'Non-smoker',
    bio: 'History of Art. I love visiting galleries and I\'m very tidy. Looking for a fellow grad..'
  }
];

export const DEFAULT_CHATS = [
  {
    id: 'chat_anas',
    name: 'Anas',
    avatar: 'A',
    lastMessage: 'Can we schedule a viewing for Tuesday?',
    time: '10:42 AM',
    messages: [
      { sender: 'receiver', text: 'Hello Anas! I saw your inquiry regarding the 2BR suite on Maple Avenue. It\'s still available for the spring semester.', time: '10:30 AM' },
      { sender: 'user', text: 'That\'s great! My roommate and I are really interested. Is the high-speed wifi included in the listed rent?', time: '10:35 AM' },
      { sender: 'receiver', text: 'Yes, all utilities including fiber internet are bundled. Here is the official listing with the full breakdown of amenities:', time: '10:40 AM' },
      { sender: 'receiver', text: 'Can we schedule a viewing for Tuesday?', time: '10:42 AM' }
    ]
  }
];
