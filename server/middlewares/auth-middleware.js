import ApiError from '../exceptions/api-error.js';
import tokenService from '../services/token-service.js';

export default async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) return next(ApiError.UnauthorizedError());
    
    const accessToken = authHeader.split(' ')[1];

    
    if (!accessToken) return next(ApiError.UnauthorizedError());
    
    const userData = await tokenService.validateAccessToken(accessToken);

    if (!userData) return next(ApiError.UnauthorizedError());

    req.user = userData;
    
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}
