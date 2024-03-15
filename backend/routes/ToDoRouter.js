import express from 'express'
import ToDo from '../Entities/ToDo.js'
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';

const toDoRouter = express.Router();

const validateTodoInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     description: Endpoint to create a new todo item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully created a new todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ToDo'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
toDoRouter.post('/todos', async (req, res) => {
    try {
        const{title, description}=req.body;
        const newToDo=await ToDo.create({title,description})
        res.status(201).json(newToDo)
    } catch (error) {
        res.status(400).json({ error: 'Internal server error. Failed to create todo' });
    }
});

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     description: Endpoint to retrieve all todo items.
 *     responses:
 *       '200':
 *         description: Successfully retrieved todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ToDo'
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
toDoRouter.get('/todos', async (req, res) => {

    try {
       const todos=await ToDo.findAll();
       res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error. Failed to retrieve todos.' });
    }
});

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     description: Endpoint to retrieve a todo item by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo item
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved the todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ToDo'
 *       '404':
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
toDoRouter.get('/todos/:id', async (req, res) => {
    try {
        const todo = await ToDo.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'To do not found!' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message, error:'Internal server error. Failed to retrieve todo' });
    }
});
/**
 * @swagger
 * /todos/{id}:
 *   patch:
 *     summary: Update a todo
 *     description: Endpoint to update a todo item by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo item
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully updated the todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ToDo'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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

toDoRouter.patch('/todos/:id',async(req,res)=>{
    try{
        const todo=await ToDo.findByPk(req.params.id);
        if(!todo){
            return res.status(400).json({message:'To do not found!'})
        }
        await todo.update(req.body);
        res.status(200).json(todo);
    }catch(error){
        res.status(500).json({error:'Internal server error. Failed to update todo.'})
    }
})

export { toDoRouter as toDoRouter };