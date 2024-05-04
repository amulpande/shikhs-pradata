interface UserLoginType {
    email: string,
    password: string
}

interface UserRegisterType {
    email: string;
    firstName: string;
    lastName: string;
    contact: string;
    gender: string;
    address: string;
    password: string;
    confirmPassword: string;
    profileImage: File | null;
}
interface TutorType {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    short_bio: string;
    experience: string;
    subjects: number;
    subjects_name: string;
    city: number;
    city_name: string;
    contact: string;
    dob: string;
    gender: string;
    address: string;
    profile_image: string;
    price: string;
    tutor_approve: boolean;
}

interface PasswordReseType{
    password: string,
    password2: string
}

interface CityStateType{
    city_name:string,
    city_state:string
}

interface CityFetchType{
    id:number,
    city_name:string,
    city_state:string
}


interface ParamIdType {
    params: {
      id: number;
    };
  }

export type {
    TutorType,
    UserLoginType,
    UserRegisterType,
    PasswordReseType,
    CityStateType,
    CityFetchType,
    ParamIdType
};