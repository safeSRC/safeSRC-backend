import bcrpyt from 'bcrypt';
import User from '../Model/User.js';

export default class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcrpyt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    return User.insert({ email, passwordHash });
  }

  static async authorize({ email, password }) {
    const user = await User.findbyEmail(email);

    if (!user) {
      throw new Error('Invalid email/password');
    }
    const matchingPasswords = await bcrpyt.compare(password, user.passwordHash);

    if (!matchingPasswords) {
      throw new Error('Invalid email/password');
    }

    return user;
  }
}
