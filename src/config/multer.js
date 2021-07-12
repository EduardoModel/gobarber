import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  // How the multer will save the image files
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // req:  the HTTP request itself
    // file: the recieved file with all the values and attributes
    // cb: callback function to execute at the end
    filename: (req, file, cb) => {
      // Generate a random string to enhance the name of the saved file
      crypto.randomBytes(16, (err, res) => {
        if (err) {
          return cb(err);
        }
        // The name format will have 16 hexadecimal characters + the extension of the file
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
