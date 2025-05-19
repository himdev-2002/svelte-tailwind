import { z } from 'zod';

export const AuthUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  roles: z.array(z.enum(['admin', 'user', 'staff'])).optional(),
  profilePicture: z.string().url().optional(),
  status: z.enum(['active', 'inactive', 'suspended']).default('active'),
  preferences: z.object({
    theme: z.enum(['light', 'dark']),
    lang: z.enum(['en', 'id']).default('en'),
  }).optional(),
  lastLogin: z.date().optional()
});

export type AuthUserType = z.infer<typeof AuthUser>;

const AuthUserUpdate = AuthUser.partial().extend({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  isActive: z.boolean().optional(),
  roles: z.array(z.enum(['admin', 'user', 'guest'])).optional(),
  profilePicture: z.string().optional(),
  lastLogin: z.date().optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark']).optional(),
    notifications: z.boolean().optional(),
  }).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional()
});
const AuthUserCreate = AuthUser.omit({ id: true }).extend({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  isActive: z.boolean().default(true),
  roles: z.array(z.enum(['admin', 'user', 'guest'])).optional(),
  profilePicture: z.string().optional(),
  lastLogin: z.date().optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark']).default('light'),
    notifications: z.boolean().default(true),
  }).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).default('active')
});
const AuthUserResponse = AuthUser.extend({
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
  lastLogin: z.date().optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark']),
    notifications: z.boolean(),
  }).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).default('active')
});
const AuthUserResponseArray = z.array(AuthUserResponse);
const AuthUserResponseArrayOptional = AuthUserResponseArray.optional();
const AuthUserResponseOptional = AuthUserResponse.optional();