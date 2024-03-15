import { Sequelize } from "sequelize";
import db from "../src/dbConfig.js";

const ToDo = db.define("ToDo", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

const ToDoSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        title: { type: "string" },
        description: { type: "string" }
    }
};

export { ToDo, ToDoSchema };