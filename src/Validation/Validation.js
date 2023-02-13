import * as Yup from 'yup';


export const validationSchema = Yup.object({
    fname: Yup
        .string('Enter your Full name')
        .min(2, 'Please enter your real name')
        .required('Your name is required'),
    email: Yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: Yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, { message: "Please create a stronger password(special characters,numbers..)" })
        .required('Password is required'),
    confirmPassword: Yup.
        string().
        oneOf([Yup.ref('password'), null], ('Passwords must match '))
        .required('Password confirmation is required'),
    contact: Yup
        .string('Contact cannot be alphabets')
        .min(10, 'Contact must be 10 characters')
        .max(10, 'Contacts must be 10 characters')
        .required('Contacts is required')
});

