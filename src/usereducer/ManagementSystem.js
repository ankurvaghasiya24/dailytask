import React, { useReducer, useRef } from 'react';

const initialState = {
  lists: [
    { id: 1, title: 'To Do', tasks: [], },
    { id: 2, title: 'In Progress', tasks: [] },
    { id: 3, title: 'Done', tasks: [] },
  ],
};
  

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return {
        ...state,
        lists: [...state.lists, { id: state.lists.length + 1, title: action.title, tasks: [] }],
      };
    case 'ADD_TASK':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.listId
            ? { ...list, tasks: [...list.tasks, { id: Date.now(), name: action.task }] }
            : list
        ),
      };
    case 'MOVE_TASK':
      const { fromListId, toListId, taskId } = action;
      const taskToMove = state.lists
        .find((list) => list.id === fromListId)
        .tasks.find((task) => task.id === taskId);

      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === fromListId) {
            return { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) };
          }
          if (list.id === toListId) {
            return { ...list, tasks: [...list.tasks, taskToMove] };
          }
          return list;
        }),
      };
    default:
      return state;
  }
};

const ManagementSystem = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const listTitleRef = useRef();
  const taskInputRefs = useRef({});

  const addList = () => {
    const title = listTitleRef.current.value.trim();
    if (title) {
      dispatch({ type: 'ADD_LIST', title });
      listTitleRef.current.value = '';
    }
  };

  const addTask = (listId) => {
    const task = taskInputRefs.current[listId].value.trim();
    if (task) {
      dispatch({ type: 'ADD_TASK', listId, task });
      taskInputRefs.current[listId].value = '';
    }
  };

  const moveTask = (fromListId, toListId, taskId) => {
    dispatch({ type: 'MOVE_TASK', fromListId, toListId, taskId });
  };

  return (
    <div className="container">
      <h2 className="mt-4">Task Management System</h2>

      <div className="mb-3">
        <input type="text" ref={listTitleRef} className="form-control" placeholder="New List Title" />
        <button className="btn btn-primary mt-2" onClick={addList}>Add List</button>
      </div>

      <div className="d-flex justify-content-between">
        {state.lists.map((list) => (
          <div key={list.id} className="card" style={{ width: '18rem', margin: '0 10px' }}>
            <div className="card-body">
              <h5 className="card-title">{list.title}</h5>

              <input
                type="text"
                ref={(el) => (taskInputRefs.current[list.id] = el)}
                className="form-control mb-2"
                placeholder={`Add Task to ${list.title}`}
              />
              <button className="btn btn-success" onClick={() => addTask(list.id)}>Add Task</button>

              <ul className="list-group mt-3">
                {list.tasks.map((task) => (
                  <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {task.name}
                    <div>
                      {state.lists
                        .filter((otherList) => otherList.id !== list.id)
                        .map((otherList) => (
                          <button
                            key={otherList.id}
                            className="btn btn-outline-secondary btn-sm mx-1"
                            onClick={() => moveTask(list.id, otherList.id, task.id)}>
                            Move to {otherList.title}
                          </button>
                        ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagementSystem;



