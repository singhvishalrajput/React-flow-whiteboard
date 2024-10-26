import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { initialEdges, initialNodes } from "./constants";
import { InputNode } from "./components/node/InputNode";
import { TextNode } from "./components/node/TextNode";
import CustomEdge from "./components/edge/CustomEdge";
import html2canvas from "html2canvas";
import ModeToggle from './components/UI/ModeToggle'; // Import ModeToggle
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const nodeTypes = {
  input: InputNode,
  text: TextNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

export default function App() {
  const reactFlowWrapper = useRef(null);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // State for Light/Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => addEdge({ ...params, type: "customEdge" }, eds)),
    [setEdges]
  );

  const handleDownload = () => {
    if (reactFlowWrapper.current) {
      html2canvas(reactFlowWrapper.current, {
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: true,
        logging: true,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "whiteboard.png";
        link.click();
      });
    }
  };

  // Toggle light/dark mode
  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        ref={reactFlowWrapper}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff", // Dark/Light mode background color
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={12}
            size={1}
            color={isDarkMode ? "#888" : "#ccc"} // Adjust background dots based on mode
          />
          <MiniMap
          nodeStrokeColor={(n) => (isDarkMode ? "#ffffff" : "#000000")} // Node stroke color
          nodeColor={(n) => (n.type === "input" ? "#ffcc00" : "#00ccff")} // Node fill color
          nodeBorderRadius={5}
          style={{
            background: isDarkMode ? "#333333" : "#ffffff", // MiniMap background color
            border: "1px solid",
            borderColor: isDarkMode ? "#ffffff" : "#000000", // Border color
          }}
          zoomable
          pannable
        />
          <Controls />
        </ReactFlow>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "20px 30px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={faDownload} />
      </button>

      {/* Mode Toggle Component */}
      <ModeToggle onToggleMode={toggleMode} isDarkMode={isDarkMode} />
    </div>
  );
}


