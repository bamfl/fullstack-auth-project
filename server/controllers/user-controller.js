import userService from '../services/user-service.js';

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await userService.registration(email, password);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.status(201).json(userData);
    } catch (e) {
      console.error(e);
      res.status(409).json({ message: e.message });
    }
  }

  async login(req, res, next) {
    try {
    } catch (e) {
      console.error(e);
    }
  }

  async logout(req, res, next) {
    try {
    } catch (e) {
      console.error(e);
    }
  }

  async refresh(req, res, next) {
    try {
    } catch (e) {
      console.error(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.activationLink;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      console.error(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(['133', '456']);
    } catch (e) {
      console.error(e);
    }
  }
}

export default new UserController();
