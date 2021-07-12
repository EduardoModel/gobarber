import * as Yup from 'yup';
// import { password } from '../../config/database';
import User from '../models/User';
import File from '../models/File';

/**
 * Every controller should have a maximum of 5 methods;
 * These methods are:
 * index: To LIST the entries (filters can be aplied as bussiness rules as well)
 * show: To SHOW an entry
 * store: To CREATE AND STORE a new entry
 * update: To UPDATE an existing entry inside the database
 * destroy|delete: To REMOVE/DESTROY an existing entry inside the database
 */

class UserController {
  // Method responsable to save a new entry inside the database
  async store(req, res) {
    // Define a schema to validade the information that will be given to the backend
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    // Verify if the data pass inside the defined schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation failed',
      });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({
        error: 'User already exists',
      });
    }
    // Take the data sent from the client and create a new instance of the user
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      // If oldPassword is defined, the field password need to be filled up/defined
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when(
        'password',
        (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field // Verify if the field confirmPassword is equals to the field password
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation failed',
      });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    // Verify if the user wants to change his email address
    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });
      if (userExists) {
        return res.status(400).json({
          error: 'User already exists',
        });
      }
    }

    // Verify if the user is trying to change his password
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }

    // Update the user data
    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new UserController();
