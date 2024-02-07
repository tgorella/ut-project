export interface LoginSchema {
email: string,
password: string,
isLoading: boolean,
rememberMe?: boolean,
error?: string,
}

export interface RegistrationFormSchema {
  email: string,
  password: string,
  repeatPassword: string
}