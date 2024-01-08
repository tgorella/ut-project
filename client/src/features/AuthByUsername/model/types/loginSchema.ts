export interface LoginSchema {
email: string,
password: string,
isLoading: boolean,
rememberMe?: boolean,
error?: string,
}