export interface IClientSponsor {
  sponsorName?: string;
  sponsorSurname?: string;
  sponsorCpf?: string;
}

export interface IClientEmergency extends IClientSponsor {
  emergencyName: string;
  emergencySurname: string;
  emergencyPhone: string;
}

export interface IAddress extends IClientEmergency {
  street: string;
  district: string;
  number: number;
  city: string;
  complement: string;
  state: string;
  zipcode: string;
}

export interface IClient extends IAddress {
  id?: string;
  active: boolean;
  sponsor?: boolean;
  name: string;
  surname: string;
  birthdate: Date;
  cpf: string;
  email: string;
  phone: string;
  consultationPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
  professionalId: string;
}
