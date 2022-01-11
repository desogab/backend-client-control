export interface IProfessionalInfo {
  professionalId?:string;
  name:string;
  surname:string;
  birthdate:Date;
  cpf:string;
  email:string;
  phone:string;
  profession:string;
  professionalDocument:string;
}

export interface IProfessionalUser extends IProfessionalInfo {
  id: string;
  username:string;
  password:string;
}
