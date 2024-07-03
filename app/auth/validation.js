import { z } from 'zod';

export const SignupFormSchema = z.object({
  name: z.string().min(1, {message: 'Please enter your name.'}),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

export const EventFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
  location: z.string().min(3, 'Location must be at least 3 characters').max(400, 'Location must be less than 400 characters'),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.price !== '0' && data.isFree) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'If the event is free, the price must be 0.',
      path: ['price'],
    });
  }

  if (data.price !== '0') {
    data.isFree = false;
  }

  if (data.isFree) {
    data.price = '0';
  }
});