const { Todo } = require("../models/Todos");

/**
 *  @desc Get all Tasks 
 * @route /todo
 * @method GET
 * @access public
 */
const getAllTasks = async (req, res) => {
  const todo = await Todo.find();
  res.status(200).json(todo);
};

/**
 *  @desc Get task by ID
 * @route /todo/:id
 * @method GET
 * @access public
 */
const getTaskById = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo) {
    res.status(201).json(todo);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
};

/**
 *  @desc Create new task
 * @route /todo
 * @method POST
 * @access public
 */
const createTask = async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/**
 *  @desc Update task by ID
 * @route /todo/:id
 * @method PUT
 * @access public
 */
const updateTask = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo) {
    await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
};

/**
 *  @desc Delete task by ID
 * @route /todo/:id
 * @method DELETE
 * @access public
 */
const deleteTask = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo) {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfuly" });
  } else {
    res.status(404).json({ message: "Not Found" });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
