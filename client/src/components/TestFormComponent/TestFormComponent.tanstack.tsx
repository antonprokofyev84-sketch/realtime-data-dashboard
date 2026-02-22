import { useEffect, useRef, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
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

export const TestFormComponentTanstack = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [shouldScroll, setShouldScroll] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const form = useForm<RegistrationFormData>({
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
    validatorAdapter: zodValidator,
    validators: {
      onChange: registrationSchema,
    },
    onSubmit: async ({ value }) => {
      setSuccessMessage('');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', value);
      setSuccessMessage('Registration successful!');
    },
  });

  const userType = form.useStore((state) => state.values.userType);
  const phoneNumbers = form.useStore((state) => state.values.phoneNumbers);

  useEffect(() => {
    if (shouldScroll && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  return (
    <FormCard ref={formRef}>
      <Title>User Registration Form (TanStack Form)</Title>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <Form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setShouldScroll(true);
          void form.handleSubmit();
        }}
      >
        <form.Field
          name="username"
          children={(field) => (
            <FieldGroup>
              <Label>Username *</Label>
              <Input
                type="text"
                placeholder="Choose a username"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.touchedErrors?.[0] && (
                <ErrorMessage>{field.state.meta.touchedErrors[0]}</ErrorMessage>
              )}
            </FieldGroup>
          )}
        />

        <form.Field
          name="fullName"
          children={(field) => (
            <FieldGroup>
              <Label>Full Name *</Label>
              <Input
                type="text"
                placeholder="John Doe"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.touchedErrors?.[0] && (
                <ErrorMessage>{field.state.meta.touchedErrors[0]}</ErrorMessage>
              )}
            </FieldGroup>
          )}
        />

        <form.Field
          name="email"
          children={(field) => (
            <FieldGroup>
              <Label>Email *</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.touchedErrors?.[0] && (
                <ErrorMessage>{field.state.meta.touchedErrors[0]}</ErrorMessage>
              )}
            </FieldGroup>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <FieldGroup>
              <Label>Password *</Label>
              <Input
                type="password"
                placeholder="At least 8 characters"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.touchedErrors?.[0] && (
                <ErrorMessage>{field.state.meta.touchedErrors[0]}</ErrorMessage>
              )}
            </FieldGroup>
          )}
        />

        <form.Field
          name="confirmPassword"
          children={(field) => (
            <FieldGroup>
              <Label>Confirm Password *</Label>
              <Input
                type="password"
                placeholder="Repeat your password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.touchedErrors?.[0] && (
                <ErrorMessage>{field.state.meta.touchedErrors[0]}</ErrorMessage>
              )}
            </FieldGroup>
          )}
        />

        <form.Field
          name="country"
          children={(field) => (
            <FieldGroup>
              <Label>Country *</Label>
              <Select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              >
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="de">Germany</option>
              </Select>
              {field.state.meta.touchedErrors?.[0] && (
                <ErrorMessage>{field.state.meta.touchedErrors[0]}</ErrorMessage>
              )}
            </FieldGroup>
          )}
        />

        <form.Field
          name="userType"
          children={(field) => (
            <FieldGroup>
              <Label>Account Type *</Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    value="personal"
                    checked={field.state.value === 'personal'}
                    onChange={(e) => field.handleChange(e.target.value as 'personal' | 'business')}
                    onBlur={field.handleBlur}
                  />
                  <span>Personal</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    value="business"
                    checked={field.state.value === 'business'}
                    onChange={(e) => field.handleChange(e.target.value as 'personal' | 'business')}
                    onBlur={field.handleBlur}
                  />
                  <span>Business</span>
                </RadioLabel>
              </RadioGroup>
              {field.state.meta.touchedErrors?.[0] && (
                <ErrorMessage>{field.state.meta.touchedErrors[0]}</ErrorMessage>
              )}
            </FieldGroup>
          )}
        />

        {userType === 'business' && (
          <form.Field
            name="companyName"
            children={(field) => (
              <FieldGroup>
                <Label>Company Name *</Label>
                <Input
                  type="text"
                  placeholder="Your company name"
                  value={field.state.value || ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {field.state.meta.touchedErrors?.[0] && (
                  <ErrorMessage>{field.state.meta.touchedErrors[0]}</ErrorMessage>
                )}
              </FieldGroup>
            )}
          />
        )}

        <form.Field
          name="interests"
          children={(field) => (
            <FieldGroup>
              <Label>Interests</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Technology', 'Sports', 'Music', 'Art', 'Travel'].map((interest) => {
                  const isSelected = field.state.value.includes(interest);
                  return (
                    <CheckboxLabel key={interest}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          const next = isSelected
                            ? field.state.value.filter((item) => item !== interest)
                            : [...field.state.value, interest];
                          field.handleChange(next);
                        }}
                        onBlur={field.handleBlur}
                      />
                      <span>{interest}</span>
                    </CheckboxLabel>
                  );
                })}
              </div>
              {field.state.meta.touchedErrors?.[0] && (
                <ErrorMessage>{field.state.meta.touchedErrors[0]}</ErrorMessage>
              )}
            </FieldGroup>
          )}
        />

        <FieldGroup>
          <Label>Phone Numbers</Label>
          <FieldArrayContainer>
            {phoneNumbers.map((_, index) => (
              <div
                key={`phone-${index}`}
                style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}
              >
                <form.Field
                  name={`phoneNumbers.${index}.number`}
                  children={(field) => (
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      value={field.state.value || ''}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  )}
                />
                {phoneNumbers.length > 1 && (
                  <RemoveButton
                    type="button"
                    onClick={() => {
                      const next = phoneNumbers.filter((_, itemIndex) => itemIndex !== index);
                      form.setFieldValue('phoneNumbers', next);
                    }}
                  >
                    Remove
                  </RemoveButton>
                )}
              </div>
            ))}
            <AddButton
              type="button"
              onClick={() => {
                form.setFieldValue('phoneNumbers', [...phoneNumbers, { number: '' }]);
              }}
            >
              + Add Phone Number
            </AddButton>
          </FieldArrayContainer>
        </FieldGroup>

        <form.Field
          name="acceptTerms"
          children={(field) => (
            <FieldGroup>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  onBlur={field.handleBlur}
                />
                <span>I accept the terms and conditions *</span>
              </CheckboxLabel>
              {field.state.meta.touchedErrors?.[0] && (
                <ErrorMessage>{field.state.meta.touchedErrors[0]}</ErrorMessage>
              )}
            </FieldGroup>
          )}
        />

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <Button type="submit" disabled={!form.state.canSubmit || form.state.isSubmitting}>
            {form.state.isSubmitting ? 'Submitting...' : 'Register'}
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.reset();
              setSuccessMessage('');
            }}
            disabled={form.state.isSubmitting}
            style={{ background: '#64748b' }}
          >
            Reset
          </Button>
        </div>
      </Form>
    </FormCard>
  );
};
