
import { PackageType, DetailPackage, GalleryItem } from './types';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  photo: string;
  rating: number;
}

export const PACKAGES: DetailPackage[] = [
  {
    id: 'ext-pro',
    name: 'Pro Exterior',
    type: PackageType.EXTERIOR,
    price: '$79',
    description: 'A thorough deep clean for your vehicle\'s exterior surfaces.',
    image: 'https://picsum.photos/800/600?random=1',
    features: [
      'Foam Cannon Pre-Wash',
      'Hand Wash & Dry',
      'Wheel & Tire Deep Clean',
      'Tire Dressing',
      'Glass Streak-Free Shine',
      'Spray Sealant Protection'
    ]
  },
  {
    id: 'int-pro',
    name: 'Pristine Interior',
    type: PackageType.INTERIOR,
    price: '$129',
    description: 'Transform your cabin into a showroom-fresh environment.',
    image: 'https://picsum.photos/800/600?random=2',
    features: [
      'Deep Vacuuming',
      'Steam Cleaning',
      'Upholstery Shampoo',
      'Leather Conditioning',
      'Dashboard & Console UV Protection',
      'Odor Neutralizer'
    ]
  },
  {
    id: 'full-showroom',
    name: 'Showroom Detail',
    type: PackageType.FULL,
    price: '$199',
    description: 'The ultimate restoration for both inside and out.',
    image: 'https://picsum.photos/800/600?random=3',
    features: [
      'Everything in Exterior & Interior',
      'Engine Bay Cleaning',
      'Clay Bar Treatment',
      'Carnauba Wax Finish',
      'Door Jam Cleaning',
      'Interior Detail Brushing'
    ]
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: '1',
    title: 'Range Rover Paint Correction',
    category: 'Paint Correction',
    before: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600',
    after: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    title: 'Family Van Interior Revive',
    category: 'Interior',
    before: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    after: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '3',
    title: 'Classic Mustang Restoration',
    category: 'Exterior',
    before: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=600',
    after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Tesla Model S Owner',
    content: 'GlossMobile is a lifesaver. They detailed my car while I was in meetings, and I walked out to a car that looked better than the day I bought it. Absolutely impeccable service.',
    photo: 'https://i.pravatar.cc/150?u=sarah',
    rating: 5
  },
  {
    id: 't2',
    name: 'David Chen',
    role: 'Porsche Enthusiast',
    content: 'The attention to detail on the paint correction was amazing. They removed swirls I thought were permanent. Highly recommend for high-end vehicles.',
    photo: 'https://i.pravatar.cc/150?u=david',
    rating: 5
  },
  {
    id: 't3',
    name: 'Michael Ross',
    role: 'Family SUV Owner',
    content: 'With three kids and a dog, my interior was a disaster. GlossMobile spent 4 hours on it and managed to get every single stain out. It smells amazing!',
    photo: 'https://i.pravatar.cc/150?u=michael',
    rating: 5
  }
];
