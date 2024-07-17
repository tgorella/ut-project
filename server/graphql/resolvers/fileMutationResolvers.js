import { checkAuth, throwServerError } from './helpers.js';
import config from 'config'

import EasyYandexS3 from 'easy-yandex-s3';

// Инициализация
let s3 = new EasyYandexS3.default({
  auth: {
    accessKeyId: config.get('ys_id_key'),
    secretAccessKey: config.get('ys_secret_key'),
  },
  Bucket: 'gte-image-thing', // например, "my-storage",
  debug: true, // Дебаг в консоли, потом можете удалить в релизе
});

const fileMutationResolvers = {
 
 uploadManyFiles: async (_, { files }, context) => {
    const links = []
    if (files.length > 0) {
      for(const file of files) {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const chunks = [];
  
        // Create a stream and collect the file chunks into a buffer
        const stream = createReadStream();
        await new Promise((resolve, reject) => {
          stream.on('data', (chunk) => chunks.push(chunk));
          stream.on('end', resolve);
          stream.on('error', reject);
        });
  
        // Combine the chunks into a single buffer
        const buffer = Buffer.concat(chunks);
      try {
        let upload = await s3.Upload({ buffer }, '/avatars/');
        
        links.push(upload.Location)
      
      } catch (error) {
        throwServerError()
      }
    }
    return links

    }
  }
}

export default fileMutationResolvers