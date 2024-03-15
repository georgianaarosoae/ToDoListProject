import express from 'express';
import User from '../Entities/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginRouter = express.Router();
const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, 'secret_key', (err, user) => {
        if (err) {
          return res.status(403).json({ error: 'Token is not valid!' });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ error: 'Unauthorized - Incorrect credentials.' });
    }
  };



/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user and generate JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                     email:
 *                       type: string
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

  loginRouter.post('/login', async (req, res) => {
    try {
        console.log('Login Server side')
        const { email, password } = req.body;
        console.log(email,password)
        const user = await User.findOne({
            where: {
                email
            }
        });
        
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - Incorrect credentials.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Incorrect credentials.' });
        }

        const token = jwt.sign({ userId: user.user_id, email: user.email }, 'secret_key');
        await user.update({ logged_in: true });
        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        console.log(req.body);
        return res.status(500).json({ error: 'Internal server error during login' });
    }
});


/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     description: Invalidate JWT token and log out user
 *     responses:
 *       '200':
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                     email:
 *                       type: string
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

loginRouter.post('/logout', verify,async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(400).json({ error: 'Missing authorization token.' });
        }

        const decodedToken = jwt.verify(token, 'secret_key');
        if (!decodedToken) {
            return res.status(401).json({ error: 'Invalid authorization token' });
        }

        const user = await User.findByPk(decodedToken.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        await user.update({ logged_in: false });
        res.json({ message: 'Logout successful.', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error during logout.' });
    }
});


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register new user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                     email:
 *                       type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

loginRouter.post('/register', async (req, res) => {
    try {
        const { user_name, email, password } = req.body; 

        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = await User.create({
            user_name,
            email, 
            password: hashedPassword, 
            logged_in: false

        });

        res.status(200).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error during registration' });
    }
});

export { loginRouter };
