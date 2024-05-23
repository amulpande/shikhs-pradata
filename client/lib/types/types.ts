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

interface TutorProfile {
    first_name: string;
    last_name: string;
    email: string;
    // short_bio: string;
    contact: string;
    address: string;
    profile_image: string;
    price: string;
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

interface BookingType {
    id: number,
    user_name: string,
    user_email: string,
    tutor_name: string,
    tutor_email: string,
    tutor_id: number,
    user_id: number,
    cancellation_reason: string,
    order_date: string,
    booking_date: string,
    booking_time: string,
    payment_status: string,
    status: string,
    subject_id: number,
    subject_name: string,
    tutor_price: number,
    tutor_contact: string,
    user_profile:string,
    tutor_profile:string,
    user_contact:number,
    user_address:string
}


interface UserDataTypes {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    contact: string,
    role: number,
    gender: string,
    profile_image: string,
    address: string
}

interface UserProfileTypes {
    email: string,
    first_name: string,
    last_name: string,
    contact: string,
    profile_image: string,
    address: string
}

type FetchTutorDataProps = {
    page: number;
    search: string;
}

interface UserBookTutortypes {
    tutor_id: number,
    subject_id: number,
    booking_time: string,
    booking_date: string
}

interface AdminFeedbackTypes {
    id: number,
    tutor_id: number,
    user_id: number,
    user_name: string,
    tutor_name: string,
    star: number,
    review: string,
    isApproved: boolean,
    isDeleted: boolean,
    user_profile:string,
    tutor_profile:string,
    user_email:string
}

interface SubjectTypes {
    id: number,
    subject_name: string,
    isDisabled:boolean,
}


interface FeedbackMainPageType {
    id: number,
    user_id: number,
    tutor_id: number,
    user_profile: string
    star: number,
    review: string,
    user_name: string,
}


interface AdminAllTotalTypes {
    Last_month_earning: number,
    total_earning: number,
    total_approved_tutor: number,
    total_blocked_tutor: number,
    total_booking: number,
    total_user: number
}

interface TutorAllTotalTypes {
    total_earning: number,
    monthly_income: number,
    pending_request: number,
    payment_paid: number,
    accpted_request:number,
    rejected_request:number,
    total_request:number,
}

interface PyamentType {
    id:number
    user_id:number,
    tutor_id:number,
    booking_id:number,
    tutor_amount:number,
    payment_date:string,
    admin_amount:number,
    user_profile:string,
    tutor_profile:string,
    user_name:string,
    tutor_name:string,
}

interface ContactUsType{
    name: string;
    email: string;
    contact: string;
    subject: string;
    message: string;
}
interface ContactUsTypes extends ContactUsType {
    id:number;
};


export type {
    TutorType,
    UserLoginType,
    UserRegisterType,
    PasswordReseType,
    CityStateType,
    CityFetchType,
    ParamIdType,
    BookingType,
    UserDataTypes,
    FetchTutorDataProps,
    TutorProfile,
    UserProfileTypes,
    UserBookTutortypes,
    AdminFeedbackTypes,
    SubjectTypes,
    FeedbackMainPageType,
    AdminAllTotalTypes,
    TutorAllTotalTypes,
    PyamentType,
    ContactUsTypes,
    ContactUsType
};