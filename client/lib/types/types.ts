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

interface PasswordReseType {
    password: string,
    password2: string
}

interface CityStateType {
    city_name: string,
    city_state: string
}

interface CityFetchType {
    id: number,
    city_name: string,
    city_state: string
}


interface ParamIdType {
    params: {
        id: number;
    };
}

interface BookingType{
    id:number,
    user_name:string,
    tutor_name:string,
    tutor_id:number,
    user_id:number,
    cancellation_reason:string,
    order_date:string,
    booking_date:string,
    booking_time:string,
    payment_status:string,
    status:string,
    subject_id:number,
    subject_name:string
}

interface UserDataTypes{
    id:number,
    email:string,
    first_name:string,
    last_name:string,
    contact:string,
    role:number,
    gender:string,
    profile_image:string,
    address:string
}

export type {
    TutorType,
    UserLoginType,
    UserRegisterType,
    PasswordReseType,
    CityStateType,
    CityFetchType,
    ParamIdType,
    BookingType,
    UserDataTypes
};