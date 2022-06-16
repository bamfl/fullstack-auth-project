import jwt from 'jsonwebtoken';
import TokenModel from '../models/token-model.js';

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '10d' });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const newToken = await TokenModel.create({ user: userId, refreshToken });
    return newToken;
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
      return tokenData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
      return tokenData;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

export default new TokenService();
