export interface PolicyGeneratorProps {
  expDate: string
  bucketName: string
  fileName: string
  fileType: string
  maxSize: number
  acl: string,
  accessId: string
}

export const policyGenerator = (props : PolicyGeneratorProps) => {
    const {expDate, bucketName, fileName, fileType, maxSize, acl, accessId} = props
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1

    const policy = {
        'expiration': expDate,
        'conditions': [
            {'bucket': bucketName},
            ['starts-with', '$key', `${year}/${month}/${fileName}`],
            {'acl': acl},
            {'Content-Type': `${fileType || 'image/jpeg'}`},
            ['content-length-range', 0, maxSize],
            {'X-Amz-Date': expDate.replace(/[-:]/g, '')},
            {'X-Amz-Algorithm': 'AWS4-HMAC-SHA256'},
            {'X-Amz-Credential': `${accessId}/${expDate.replace(/[-:]/g, '').split('T')[0]}/ru-central1/s3/aws4_request`}
        ]
    }

    return policy
}
