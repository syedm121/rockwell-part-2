export type Material = 'Chrome' | 'Gunmetal' | 'White Chrome' | 'Rose Gold' | 'Stainless Steel' | 'Matte Black';
export type RazorType = 'Adjustable' | 'Fixed';

export interface Razor {
  id: string;
  name: string;
  material: Material;
  price: number;
  type: RazorType;
  inStock: boolean;
  selected: boolean;
}

export const razors: Razor[] = [
  {
    id: '1',
    name: 'Rockwell 6S Adjustable',
    material: 'Stainless Steel',
    price: 120,
    type: 'Adjustable',
    inStock: true,
    selected: false,
  },
  {
    id: '2',
    name: 'Rockwell 6C',
    material: 'Chrome',
    price: 80,
    type: 'Fixed',
    inStock: true,
    selected: false,
  },
  {
    id: '3',
    name: 'Rockwell T2',
    material: 'Gunmetal',
    price: 50,
    type: 'Fixed',
    inStock: true,
    selected: false,
  },
  {
    id: '4',
    name: 'Rockwell R1',
    material: 'White Chrome',
    price: 40,
    type: 'Fixed',
    inStock: true,
    selected: false,
  },
  {
    id: '5',
    name: 'Rockwell Model T',
    material: 'Matte Black',
    price: 150,
    type: 'Adjustable',
    inStock: true,
    selected: false,
  },
  {
    id: '6',
    name: 'Rockwell 2C',
    material: 'Chrome',
    price: 30,
    type: 'Fixed',
    inStock: true,
    selected: false,
  },
  {
    id: '7',
    name: 'Rockwell 6S Rose',
    material: 'Rose Gold',
    price: 135,
    type: 'Adjustable',
    inStock: true,
    selected: false,
  },
  {
    id: '8',
    name: 'Rockwell 6C Gunmetal',
    material: 'Gunmetal',
    price: 85,
    type: 'Fixed',
    inStock: false,
    selected: false,
  },
  {
    id: '9',
    name: 'Rockwell R1 Rose Gold',
    material: 'Rose Gold',
    price: 55,
    type: 'Fixed',
    inStock: false,
    selected: false,
  },
  {
    id: '10',
    name: 'Rockwell 2C White',
    material: 'White Chrome',
    price: 35,
    type: 'Fixed',
    inStock: true,
    selected: false,
  },
  {
    id: '11',
    name: 'Rockwell Model T Chrome',
    material: 'Chrome',
    price: 160,
    type: 'Adjustable',
    inStock: false,
    selected: false,
  },
  {
    id: '12',
    name: 'Rockwell T2 Rose Gold',
    material: 'Rose Gold',
    price: 65,
    type: 'Fixed',
    inStock: true,
    selected: false,
  },
];
