import axios from "axios";

export type Story = {
  id: number;
  firstName: string;
  image: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: "male" | "female";
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
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
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
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
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
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: "admin" | "moderator" | "user";
};

type ResponseDataFromDummyUsers = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export async function fetchStories() {
  const {data} = await axios.get<ResponseDataFromDummyUsers>(
    "https://dummyjson.com/users",
  );
  const stories: Story[] = [];
  data.users.forEach((user) => {
    stories.push({id: user.id, firstName: user.firstName, image: user.image});
  });
  return stories;
}
