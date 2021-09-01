import bcrypt from 'bcrypt';
import User from '../models/User.js';

export default class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    return User.insert({ email, passwordHash });
  }

  static async authorize({ email, password }) {
    const user = await User.findByEmail(email);

    if (!user) {
      throw new Error('Invalid email/password');
    }
    const matchingPasswords = await bcrypt.compare(password, user.passwordHash);

    if (!matchingPasswords) {
      throw new Error('Invalid email/password');
    }

    return user;
  }
}
