import React, { useReducer } from "react";

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "draw":
      return { ...state, path: [...state.path, action.point] };
    case "clear":
      return { ...state, path: [] };
    default:
      return state;
  }
};

// Component
export const Drawing = () => {
  const [state, dispatch] = useReducer(reducer, { path: [] });

  const handleDraw = (point) => {
    dispatch({ type: "draw", point });
  };

  const handleClear = () => {
    dispatch({ type: "clear" });
  };

  return (
    <div>
      <svg
        width="200"
        height="200"
        onClick={(e) => handleDraw({ x: e.clientX, y: e.clientY })}
      >
        {state.path.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r="5" />
        ))}
      </svg>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};
