import * as yup from 'yup';

export const tutorRegistrationValidationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),

    firstName: yup.string().required('First name is required'),

    lastName: yup.string().required('Last name is required'),

    contact: yup.string().required('Contact is required')
        .matches(/^[0-9]+$/, 'Contact must contain only numbers')
        .max(10, 'Contact must be at most 10 characters'),

    gender: yup.string()
        .required('Gender is required')
        .oneOf(['male', 'female', 'other'], 'Invalid gender'),

    address: yup.string().required('Address is required'),

    password: yup.string()
        .required("Please enter your password")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),

    confirmPassword: yup.string()
        .required("Please confirm your password")
        .oneOf([yup.ref('password'), ''], "Passwords don't match."),

    profileImage: yup.mixed().required('Profile image is required')
        .test('fileType', 'Unsupported file format', (value:any) => {
            if (!value) return true; // Skip if no value provided
            return ['image/jpeg', 'image/png', 'image/gif','image/webp','image/jpg'].includes(value.type);
        })
        .test('fileSize', 'File size is too large', (value:any) => {
            if (!value) return true; // Skip if no value provided
            return value.size <= (5 * 1024 * 1024); // 5MB
        }),

    short_bio: yup.string(),

    city: yup.string(),

    subjects: yup.string(),

    experience: yup.number(),

    dob: yup.date(),

    price: yup.number(),
});
