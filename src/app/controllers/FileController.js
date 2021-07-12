import File from '../models/File';

class FileController {
  async store(req, res) {
    // After the upload the multer makes the variable "file" inside the req available
    // req.files would be for multiple files
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
