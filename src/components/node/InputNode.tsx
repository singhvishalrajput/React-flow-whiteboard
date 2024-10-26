import { nanoid } from "nanoid";
import { useState, useRef, useEffect } from "react";
import { Handle, Position, useReactFlow } from "reactflow";

export function InputNode() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Reference to textarea
  const { setNodes } = useReactFlow();

  // Automatically adjust the height of the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';  // Reset to auto to calculate
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';  // Set based on scroll height
    }
  }, [input]);

  // Handle creating a new node
  function handleClick() {
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: nanoid(),
        type: "text",
        position: { x: Math.random() * 300, y: Math.random() * 300 },
        data: {
          text: input,
        },
      },
    ]);
    setInput(""); // Clear input after adding node
  }

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="inputNode">
        <textarea
          id="text"
          name="text"
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="nodrag"
          rows={1}  // Start with one row, dynamically expand
          placeholder="Enter text here"
        />
        <button onClick={handleClick}>Add</button>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
