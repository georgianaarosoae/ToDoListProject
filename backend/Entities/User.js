import { Sequelize } from "sequelize";
import bcrypt from 'bcrypt'; 
import db from "../src/dbConfig.js";

const User = db.define("User", {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    user_name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    logged_in: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
});

User.prototype.comparePasswords = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};
const UserSchema = {
  type: "object",
  properties: {
      user_id: { type: "integer" },
      user_name: { type: "string" },
      email: { type: "string" },
      logged_in: { type: "boolean" }
  }
};

export { User, UserSchema };
