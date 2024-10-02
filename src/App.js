import { useEffect, useState } from "react";
import "./App.css";
import NewTask from "./NewTask";
import Dashboard from "./svg/Dashboard";
import Tasks from "./svg/Tasks";
import AddTask from "./svg/AddTask";
import ProfileIcon from "./svg/ProfileIcon";
import Task from "./Task";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Login from "./svg/Login";
import Modal from "./Modal";

function App() {
  //STATES
  const [tasks, setTasks] = useState([]);

  const [page, setPage] = useState("mytasks");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [name, setName] = useState("Lea");

  const [isClicked, setIsClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  //CURRENT CLICKED TASK ID
  const [taskId, setTaskId] = useState("");
  const handleClickedTaskId = (id) => {
    setTaskId(id);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    if (!user) return;

    setName(user);
    setIsLoggedIn(true);
  };

  const handleUserOnChange = (e) => {
    setUser(e.target.value);
  };

  function handleMyTasksClick() {
    setPage("mytasks");
  }

  function handleDashboardClick() {
    setPage("dashboard");
  }

  function handleCreateTaskClick() {
    setPage("mytasks");
    setIsClicked(true);
  }

  //

  const handleOnDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)); // Filter tasks by their unique ID
  };

  const handleOnEdit = (id, data) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...data } : task))
    );
  };

  function handleClick() {
    setIsClicked(true);
  }
  function clickFalse() {
    setIsClicked(false);
  }

  function handleAddTask(newTask) {
    setTasks((tasks) => [...tasks, newTask]); // Update the tasks array
  }

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between children animations
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { stiffness: 540, damping: 20, type: "spring" },
    },
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="layout">
          <motion.aside
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 540, damping: 20 }}
          >
            <div className="logo">
              <ProfileIcon></ProfileIcon>
              <h2>
                <span style={{ fontWeight: 300 }}>Welcome,</span> {name}!
              </h2>
            </div>
            <div className="aside-content">
              <div onClick={handleDashboardClick}>
                <Dashboard></Dashboard>DASHBOARD
              </div>
              <div onClick={handleMyTasksClick}>
                <Tasks></Tasks>MY TASKS
              </div>
              <div onClick={handleCreateTaskClick}>
                <AddTask></AddTask>CREATE A TASK
              </div>
            </div>
          </motion.aside>

          {/* MY TASKS PAGE */}
          {page === "mytasks" && (
            <div className="my-tasks">
              <h2>MY TASKS</h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="task-list"
              >
                <AnimatePresence>
                  {tasks.map((task) => (
                    <motion.div key={task.id} variants={item}>
                      <Task
                        title={task.title}
                        description={task.description}
                        date={task.date}
                        time={task.time}
                        id={task.id}
                        onDelete={handleOnDelete}
                        onEdit={handleOnEdit}
                        isModalVisible={isModalVisible}
                        toggleModal={toggleModal}
                        handleClickedTaskId={handleClickedTaskId}
                        taskId={task.id}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                <NewTask
                  tasksArray={tasks}
                  handleAddTask={handleAddTask}
                  isClicked={isClicked}
                  handleClick={handleClick}
                  clickFalse={clickFalse}
                  onDelete={handleOnDelete}
                ></NewTask>
              </motion.div>
            </div>
          )}

          {/* DASHBOARD */}
          {page === "dashboard" && <h1>DASHBOARD</h1>}
        </div>
      ) : (
        <div className="login-container">
          <form className="login">
            <label>NAME:</label>
            <div className="username">
              <input
                value={user}
                onChange={handleUserOnChange}
                type="text"
                placeholder="Enter your name..."
              ></input>
              <button onClick={handleLogIn}>
                <Login></Login>
              </button>
            </div>
          </form>
        </div>
      )}

      <Modal
        taskId={taskId}
        handleOnEdit={handleOnEdit}
        isVisible={isModalVisible}
        onClose={toggleModal}
      ></Modal>
    </div>
  );
}

export default App;
