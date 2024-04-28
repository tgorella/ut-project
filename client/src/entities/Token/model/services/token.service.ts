import { EXPIRES_KEY, REFRESH_KEY, TOKEN_KEY, USERID_KEY } from '@/shared/const/localstorage'

interface setTokensProps {
  refreshToken: string,
    accessToken: string,
    userId: string,
    expiresIn: number,
}

export function setTokens({
    refreshToken,
    accessToken,
    userId,
    expiresIn = 3600,
}: setTokensProps) {
    const expiresDate = (new Date().getTime() + expiresIn * 1000).toString()
    localStorage.setItem(USERID_KEY, userId)
    localStorage.setItem(TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_KEY, refreshToken)
    localStorage.setItem(EXPIRES_KEY, expiresDate)
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY)
}

export function getExpiresDate() {
    return Number(localStorage.getItem(EXPIRES_KEY))
}
export function getUserId() {
    return localStorage.getItem(USERID_KEY)
}
export function removeAuthData() {
    localStorage.removeItem(USERID_KEY)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(EXPIRES_KEY)
}
const tokenService = {
    setTokens,
    getAccessToken,
    getExpiresDate,
    getRefreshToken,
    getUserId,
    removeAuthData,
}
export default tokenService
