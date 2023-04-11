import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

let id = 0;
const getId = () => `dndnode_${id++}`;

const Workflow = () => {
  const [pageNumer, setPageNumer] = useState(1);
  const [workflow, setWorkflow] = useState({});
  const [modules, setModules] = useState([]);

  const { workflowId } = useParams();

  useEffect(() => {
    const url = `https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${workflowId}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setWorkflow(data));
  }, [workflowId]);

  useEffect(() => {
    const url = `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${pageNumer}&limit=5`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setModules(data));
  }, [pageNumer]);

  const handleDecrease = () => {
    if (pageNumer > 1) {
      setPageNumer(pageNumer - 1);
    }
  };
  const handleIncrease = () => {
    if (pageNumer < 20) {
      setPageNumer(pageNumer + 1);
    }
  };

  //react flow code

  const initialNodes = [
    {
      id: `${workflowId}`,
      type: "input",
      data: { label: `Input` },
      position: { x: 0, y: 0 },
    },
  ];

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div>
      <div>
        <h2 className="text-lg font-bold mx-4">
          Workflow name:{" "}
          <span className="text-purple-500"> {workflow?.name}</span>
        </h2>
      </div>
      <hr />
      <ReactFlowProvider>
        <div className="grid grid-cols-10">
          <div className="col-span-3 lg:col-span-2">
            <Sidebar
              modules={modules}
              workflow={workflow}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              pageNumer={pageNumer}
            ></Sidebar>
          </div>
          <div
            className="col-span-7 lg:col-span-8 min-h-[89vh]"
            ref={reactFlowWrapper}
          >
            <ReactFlow
              className="cursor-grab bg-gray-200 border"
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Workflow;
