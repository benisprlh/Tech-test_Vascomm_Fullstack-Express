const { verifyPassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const sendEmail = require("../helper/sendEmail");
const user = require("../models/user");
const { User, Product } = require("../models")

class ControllerUser {
    static async register(req, res, next) {
        console.log("masuk gak")
        const { name, email, phoneNumber } = req.body;
        const password = Math.random().toString(36).slice(-8);

        const formatEmail = `Your account with
Name: ${name},
email: ${email},
phoneNumber: ${phoneNumber}

success to registered

and your password is ${password}
        `
        try {
        const createdUser = await User.create({ name, email, phoneNumber, password});
        // console.log(createdUser)
        const message = await sendEmail(email, 'Password Registrasi', formatEmail);
        console.log(message)

        res.status(201).json({msg: "Your account success to registered. Check your email"});
        } catch (error) {
            console.log(error)
          next(error);
        }
      }
    
      static async login(req, res, next) {
        const { email, password } = req.body;
        console.log(req.body);
        try {
          if (!email) throw { name: 'validationError', message: 'email is required' };
    
          if (!password) throw { name: 'validationError', message: 'password is required' };
    
          const user = await User.findOne({ where: { email } });
          if (!user) throw { name: 'invalidUser', message: 'Invalid email or password' };
    
          const verifyPass = verifyPassword(password, user.password);
          if (!verifyPass) throw { name: 'invalidUser', message: 'Invalid email or password' };
    
          const access_token = signToken({ id: user.id, role: user.role });
    
          res.status(201).json({ access_token });
        } catch (error) {
          next(error);
        }
      }

      static async updateUser(req, res, next) {
        const { name, email, phoneNumber } = req.body;
        try {
            const user = await User.findByPk(req.params.id);

            if (!user) throw { name: 'not found' };

            await user.update({name, email, phoneNumber});

            res.status(200).json({msg: "Update user success"})

        } catch (error) {
            next(error)
        }
      }

      static async getUserById(req, res, next) {
        try {
            const user = await User.findByPk(req.params.id);

            if (!user) throw { name: 'not found' };

            res.status(200).json(user)

        } catch (error) {
            next(error)
        }
      }

      static async getUsers(req, res, next) {
        try {
            const users = await User.findAll();
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
      }

      static async getActive(req, res, next) {
        try {
          const allUsers = await User.count();
          const allUsersActive = await User.count({
            where: {
              status : 'active'
            }
          })
          const allProduct = await Product.count();
          const allProductActive = await Product.count({
            where: {
              status : 'active'
            }
          })
          res.status(200).json({user: allUsers, userActive: allUsersActive, product: allProduct, productActive: allProductActive})
      } catch (error) {
        console.log(error)
          next(error)
      }
      }

      static async deleteUser(req, res, next) {
        try {
          const user = await User.findByPk(req.params.id);

          if (!user) throw { name: 'not found' };

          await user.destroy()

          res.status(200).json({msg: "Delete Success"})
        } catch (error) {
          console.log(error)
        }
      }
}

module.exports = ControllerUser