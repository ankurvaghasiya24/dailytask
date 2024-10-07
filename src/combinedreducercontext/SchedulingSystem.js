import React, { useState, createContext, useContext } from 'react';



const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message }]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((notification) => notification.id !== id));
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

const TaskScheduler = () => {
    const [tasks, setTasks] = useState([]);
    const { notifications, addNotification } = useContext(NotificationContext);
    const [taskInput, setTaskInput] = useState('');
    const [editingTaskIndex, setEditingTaskIndex] = useState(null);

    const handleAddTask = () => {
        if (!taskInput) return;
        const newTask = { id: Date.now(), text: taskInput };
        setTasks((prev) => [...prev, newTask]);
        addNotification(`Task added: ${taskInput}`);
        setTaskInput('');
    };

    const handleEditTask = (index) => {
        setEditingTaskIndex(index);
        setTaskInput(tasks[index].text);
    };

    const handleUpdateTask = () => {
        if (editingTaskIndex === null || !taskInput) return;
        const updatedTasks = [...tasks];
        updatedTasks[editingTaskIndex] = { ...updatedTasks[editingTaskIndex], text: taskInput };
        setTasks(updatedTasks);
        addNotification(`Task updated: ${taskInput}`);
        setEditingTaskIndex(null);
        setTaskInput('');
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        addNotification(`Task deleted`);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Task Scheduling System</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Enter task"
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={editingTaskIndex !== null ? handleUpdateTask : handleAddTask}>
                        {editingTaskIndex !== null ? 'Update Task' : 'Add Task'}
                    </button>
                </div>
            </div>

            <ul className="list-group mb-4">
                {tasks.map((task, index) => (
                    <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {task.text}
                        <div>
                            <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEditTask(index)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
                {notifications.map((notification) => (
                    <div key={notification.id} className="alert alert-info" style={{ margin: '5px', borderRadius: '5px' }}>
                        {notification.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

const App = () => (
    <NotificationProvider>
        <TaskScheduler />
    </NotificationProvider>
);

export default App;
