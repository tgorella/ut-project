import CryptoJS from 'crypto-js'

export const objectStorageSignatureGenerator = (policy: JSON, secret: string, date: string) => {
    const base64Policy = btoa(JSON.stringify(policy))
    const DateKey = CryptoJS.HmacSHA256( date, 'AWS4' + secret)
    const RegionKey = CryptoJS.HmacSHA256( 'ru-central1', DateKey)
    const ServiceKey = CryptoJS.HmacSHA256( 's3', RegionKey)
    const SigningKey = CryptoJS.HmacSHA256('aws4_request', ServiceKey)
    const signature = CryptoJS.HmacSHA256(base64Policy, SigningKey).toString(CryptoJS.enc.Hex)

    return signature
}