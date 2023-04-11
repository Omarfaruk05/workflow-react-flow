import React from "react";
import { Handle, Position } from "reactflow";

const Sidebar = ({ modules, handleDecrease, handleIncrease, pageNumer }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const isValidConnection = (connection) => connection.target === "dffd";
  const onConnectStart = (_, { nodeId, handleType }) =>
    console.log("on connect start", { nodeId, handleType });
  const onConnectEnd = (event) => console.log("on connect end", event);

  return (
    <div className="border-2">
      <div className="min-h-[89vh]">
        <div className="py-2">
          <h2 className="text-lg font-semibold mx-4">Modules:</h2>
        </div>
        <hr />
        {modules.map((module) => (
          <>
            <Handle
              type="target"
              position={Position.top}
              isValidConnection={isValidConnection}
            />
            <div
              className="flex justify-between gap-2 border-2 m-4 rounded-lg lg:w-72 cursor-grab dndnode"
              onDragStart={(event) => onDragStart(event, module?.name)}
              draggable
            >
              <div className="pl-2 text-center">
                <p className="uppercase font-semibold">{module.input_type}</p>
              </div>
              <div className="w-[2px] bg-gray-300"></div>
              <div className="md:w-32 lg:w-40 text-center">
                <p className="font-semibold text-green-700">{module.name}</p>
              </div>
              <div className="w-[2px] bg-gray-300"></div>
              <div className="pr-2 text-center">
                <p className="uppercase font-semibold">{module.input_type}</p>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="flex justify-center mb-2">
        <div className="btn-group">
          <button onClick={handleDecrease} className="btn">
            «
          </button>
          <button className="btn">Page {pageNumer}</button>
          <button onClick={handleIncrease} className="btn">
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
