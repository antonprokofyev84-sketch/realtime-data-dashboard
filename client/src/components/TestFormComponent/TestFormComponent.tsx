import { useState, useRef, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import type { SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FormCard,
  Title,
  Form,
  Input,
  Button,
  ErrorMessage,
  FieldGroup,
  Label,
  Select,
  CheckboxLabel,
  RadioGroup,
  RadioLabel,
  FieldArrayContainer,
  RemoveButton,
  AddButton,
  SuccessMessage,
} from './TestFormComponent.styles';

// Zod schema with all validation rules
const registrationSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username cannot exceed 20 characters')
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'Username can only contain letters, numbers, hyphens, and underscores',
      ),
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .refine((val) => val.includes(' '), 'Please provide first and last name'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    country: z.string().min(1, 'Country is required'),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
    userType: z.enum(['personal', 'business']),
    companyName: z.string().optional(),
    interests: z.array(z.string()),
    phoneNumbers: z.array(
      z.object({
        number: z
          .string()
          .regex(/^[0-9+\-()]*$/, 'Invalid phone number format')
          .optional(),
      }),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine(
    (data) => {
      if (data.userType === 'business') {
        return !!data.companyName && data.companyName.length > 0;
      }
      return true;
    },
    {
      message: 'Company name is required for business accounts',
      path: ['companyName'],
    },
  )
  .refine(
    (data) => {
      if (data.userType === 'business') {
        return data.interests.length > 0;
      }
      return true;
    },
    {
      message: 'Business accounts must select at least one interest',
      path: ['interests'],
    },
  );

type RegistrationFormData = z.infer<typeof registrationSchema>;

export const TestFormComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      country: '',
      acceptTerms: false,
      userType: 'personal',
      interests: [],
      phoneNumbers: [{ number: '' }],
    },
  });

  // Auto-scroll to form when it mounts or when errors appear
  useEffect(() => {
    if (formRef.current && (Object.keys(errors).length > 0 || successMessage)) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [errors, successMessage]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phoneNumbers',
  });

  const userType = watch('userType');
  const password = watch('password');
  const interests = watch('interests');

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      setSuccessMessage('✓ Registration successful!');
      setTimeout(() => {
        setSuccessMessage('');
        reset();
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormCard ref={formRef}>
      <Title>User Registration Form</Title>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Username Field */}
        <FieldGroup>
          <Label>Username *</Label>
          <Input type="text" placeholder="Choose a username" {...register('username')} />
          {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
        </FieldGroup>

        {/* Full Name Field */}
        <FieldGroup>
          <Label>Full Name *</Label>
          <Input type="text" placeholder="John Doe" {...register('fullName')} />
          {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
        </FieldGroup>

        {/* Email Field */}
        <FieldGroup>
          <Label>Email *</Label>
          <Input type="email" placeholder="you@example.com" {...register('email')} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FieldGroup>

        {/* Password Field */}
        <FieldGroup>
          <Label>Password *</Label>
          <Input type="password" placeholder="At least 8 characters" {...register('password')} />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FieldGroup>

        {/* Confirm Password Field */}
        <FieldGroup>
          <Label>Confirm Password *</Label>
          <Input
            type="password"
            placeholder="Repeat your password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
        </FieldGroup>

        {/* Country Select */}
        <FieldGroup>
          <Label>Country *</Label>
          <Select {...register('country')}>
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            <option value="de">Germany</option>
          </Select>
          {errors.country && <ErrorMessage>{errors.country.message}</ErrorMessage>}
        </FieldGroup>

        {/* User Type Radio */}
        <FieldGroup>
          <Label>Account Type *</Label>
          <RadioGroup>
            <RadioLabel>
              <input type="radio" value="personal" {...register('userType')} />
              <span>Personal</span>
            </RadioLabel>
            <RadioLabel>
              <input type="radio" value="business" {...register('userType')} />
              <span>Business</span>
            </RadioLabel>
          </RadioGroup>
        </FieldGroup>

        {/* Conditional Company Name Field */}
        {userType === 'business' && (
          <FieldGroup>
            <Label>Company Name *</Label>
            <Input type="text" placeholder="Your company name" {...register('companyName')} />
            {errors.companyName && <ErrorMessage>{errors.companyName.message}</ErrorMessage>}
          </FieldGroup>
        )}

        {/* Interests Checkboxes */}
        <FieldGroup>
          <Label>Interests</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Technology', 'Sports', 'Music', 'Art', 'Travel'].map((interest) => (
              <CheckboxLabel key={interest}>
                <input type="checkbox" value={interest} {...register('interests')} />
                <span>{interest}</span>
              </CheckboxLabel>
            ))}
          </div>
          {errors.interests && <ErrorMessage>{errors.interests.message}</ErrorMessage>}
        </FieldGroup>

        {/* Dynamic Phone Numbers */}
        <FieldGroup>
          <Label>Phone Numbers</Label>
          <FieldArrayContainer>
            {fields.map((field, index) => (
              <div key={field.id} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  {...register(`phoneNumbers.${index}.number`)}
                />
                {fields.length > 1 && (
                  <RemoveButton type="button" onClick={() => remove(index)}>
                    Remove
                  </RemoveButton>
                )}
              </div>
            ))}
            <AddButton type="button" onClick={() => append({ number: '' })}>
              + Add Phone Number
            </AddButton>
          </FieldArrayContainer>
        </FieldGroup>

        {/* Terms Checkbox */}
        <FieldGroup>
          <CheckboxLabel>
            <input type="checkbox" {...register('acceptTerms')} />
            <span>I accept the terms and conditions *</span>
          </CheckboxLabel>
          {errors.acceptTerms && <ErrorMessage>{errors.acceptTerms.message}</ErrorMessage>}
        </FieldGroup>

        {/* Submit and Reset Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <Button type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Submitting...' : 'Register'}
          </Button>
          <Button
            type="button"
            onClick={() => {
              reset();
              setSuccessMessage('');
            }}
            disabled={isSubmitting}
            style={{ background: '#64748b' }}
          >
            Reset
          </Button>
        </div>
      </Form>
    </FormCard>
  );
};

function find3(arr: number[]) {
  let sorted = arr.sort((a, b) => a - b);
  let newArr = [];
  const lenth = sorted.length;

  for (let i = 0; i < lenth - 2; i++) {
    let current = sorted[i];
    if (current > 0) {
      break;
    }

    let left = i + 1;
    let right = lenth - 1;

    while (left < right) {
      let calc = current + sorted[left] + sorted[right];

      if (calc < 0) {
        left++;
      } else if (calc > 0) {
        right--;
      } else {
        newArr.push([current, sorted[left], sorted[right]]);
        left++;
        right--;
      }
    }
  }

  return newArr;
}

function findLongest(str) {
  let start = 0;
  let longest = 0;
  let charMap = new Map();

  for (let i = 0; i < str.length; i++) {
    let duplicateIndex = charMap.get(str[i]);
    if (typeof duplicateIndex === 'number' && duplicateIndex >= start) {
      const lng = i - start;
      if (longest < lng) {
        longest = lng;
      }
      charMap.set(str[i], i);
      start = duplicateIndex + 1;
    } else {
      charMap.set(str[i], i);
    }
  }

  const lastCheck = str.length - start;
  if (longest < lastCheck) {
    longest = lastCheck;
  }

  return longest;
}

function findProduct(arr) {
  let result = [];
  let tmp = 1;
  for (let i = 0; i < arr.length; i++) {
    result[i] = tmp;
    tmp *= arr[i];
  }

  tmp = 1;
  for (let i = arr.length - 1; i >= 0; i--) {
    result[i] *= tmp;
    tmp *= arr[i];
  }
}

function myPromiseAll(arr) {
  return new Promise((resolve, reject) => {
    let returnArr = [];
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
      arr[i]
        .then((data) => {
          returnArr[i] = data;
          counter++;
          if (counter === arr.length) {
            resolve(returnArr);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

function frequentElements(arr, k) {
  const frequencyMap = new Map();
  const frequencyArr = [];
  const result = [];

  for (let item of arr) {
    let current = frequencyMap.get(item);
    if (typeof current === 'number') {
      frequencyMap.set(item, ++current);
    } else {
      frequencyMap.set(item, 1);
    }
  }

  for (let mapItem of [...frequencyMap.entries()]) {
    let frequency = mapItem[1];
    if (frequencyArr[frequency]) {
      frequencyArr[frequency].push(mapItem[0]);
    } else {
      frequencyArr[frequency] = [mapItem[0]];
    }
  }

  let left = k;
  for (let i = frequencyArr.length; i > 0; i--) {
    if (frequencyArr[i]) {
      if (frequencyArr[i].length < left) {
        result.push(...frequencyArr[i]);
        left -= frequencyArr[i].length;
      } else {
        result.push(...frequencyArr[i].slice(0, left));
        return result;
      }
    }
  }

  return result;
}
