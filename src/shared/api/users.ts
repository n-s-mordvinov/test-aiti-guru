import type { AxiosResponse } from "axios";
import api from './axios.instance';

type Gender = 'male' | 'female'; 

interface Hair {
  color: string;
  type: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
};

interface Crypto {
  coin: string;
  wallet: string;
  network: string;
};

type Role = 'admin' | 'moderator' | 'user';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: Role;
}

type NewUser = Pick<User, 'firstName' | 'lastName' | 'username' | 'password'>

export const UsersService = {
  async addProduct(data: NewUser): Promise<User> {
    const response: AxiosResponse<User> = await api.post('/users/add', data);
    return response.data;
  },
};
