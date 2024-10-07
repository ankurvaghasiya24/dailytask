import React, { useReducer, useEffect } from 'react';

const initialState = {
  lists: [
    { id: 1, title: 'To Do', tasks: [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }] },
    { id: 2, title: 'In Progress', tasks: [{ id: 3, name: 'Task 3' }] },
    { id: 3, title: 'Done', tasks: [] },
  ],
};

const boardReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.listId
            ? { ...list, tasks: [...list.tasks, { id: Date.now(), name: action.task }] }
            : list
        ),
      };
    case 'MOVE_TASK':
      const { fromListId, toListId, taskId } = action;
      const taskToMove = state.lists
        .find(list => list.id === fromListId)
        .tasks.find(task => task.id === taskId);
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === fromListId) {
            return { ...list, tasks: list.tasks.filter(task => task.id !== taskId) };
          }
          if (list.id === toListId) {
            return { ...list, tasks: [...list.tasks, taskToMove] };
          }
          return list;
        }),
      };
    case 'LOAD_STATE':
      return action.payload || initialState;
    default:
      return state;
  }
};

const DragandDrop = () => {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('kanbanState');
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedState) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kanbanState', JSON.stringify(state));
  }, [state]);

  const addTask = (listId, task) => {
    dispatch({ type: 'ADD_TASK', listId, task });
  };

  const moveTask = (fromListId, toListId, taskId) => {
    dispatch({ type: 'MOVE_TASK', fromListId, toListId, taskId });
  };

  const handleDragStart = (e, taskId, listId) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('fromListId', listId);
  };

  const handleDrop = (e, toListId) => {
    const taskId = parseInt(e.dataTransfer.getData('taskId'), 10);
    const fromListId = parseInt(e.dataTransfer.getData('fromListId'), 10);
    moveTask(fromListId, toListId, taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Kanban Board</h2>
      <div className="d-flex justify-content-between">
        {state.lists.map((list) => (
          <div
            key={list.id}
            className="card"
            style={{ width: '18rem' }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, list.id)}
          >
            <div className="card-header text-center">
              <h5>{list.title}</h5>
            </div>
            <div className="card-body">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="New Task"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    addTask(list.id, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <ul className="list-group">
                {list.tasks.map((task) => (
                  <li
                    key={task.id}
                    className="list-group-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id, list.id)}
                    style={{ cursor: 'move' }}
                  >
                    {task.name}
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

export default DragandDrop;
