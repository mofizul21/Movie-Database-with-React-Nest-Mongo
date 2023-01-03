import { RegsiterFormField } from './RegisterFormFields.interface';

export type NewUser = Omit<RegsiterFormField, 'confirmPassword'>;
