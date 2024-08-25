import { throwServerError } from './helpers.js';
import config from 'config'
import sharp from 'sharp'
import transliterate from '../../utils/transliterate/transliterate.js';

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
 
 uploadManyFiles: async (_, { files }) => {
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
  },
  uploadBankLogo: async (_, { files }) => {
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
        let upload = await s3.Upload({ buffer }, '/banks/');
        
        links.push(upload.Location)
      
      } catch (error) {
        throwServerError()
      }
    }
    return links

    }
  },
  uploadProductImages: async (_, { files }, context) => {
    const links = []
    if (files.length > 0) {
      for(const file of files) {
        const { createReadStream, filename, mimetype, encoding } = await file;
        const chunks = [];
        console.log(filename)
  
        // Create a stream and collect the file chunks into a buffer
        const stream = createReadStream();
        await new Promise((resolve, reject) => {
          stream.on('data', (chunk) => chunks.push(chunk));
          stream.on('end', resolve);
          stream.on('error', reject);
        });
  
        // Combine the chunks into a single buffer
        const buffer = Buffer.concat(chunks);
        const img = await sharp(buffer).resize(512).toFormat('webp').toBuffer()
          try {

          let upload = await s3.Upload({ 
            buffer: img,
          name: transliterate(filename.split('.')[0])+'_'+Date.now().toString()+'.webp',
         }, `/products/${context.user._id}/`);
          links.push(upload.Location)

        } catch (error) {
          throwServerError()
        }
  }
    return links
    }
  },

  deleteProductImage: async (_, { fileName }, context) => {
    try {
      const result = await s3.Remove(`/products/${context.user._id}/${fileName}`)
      return result
    } catch (error) {
      throwServerError()
    }
  }
}

export default fileMutationResolvers