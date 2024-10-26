import { NodeProps, Position } from "reactflow";
import CustomHandle from "../CustomHandle";

export function TextNode({ data }: NodeProps<{ text: string }>) {
  return (
    <>
      <CustomHandle type="target" position={Position.Top} />
      <div className="textNode">
        <span>{data.text}</span>
      </div>
      <CustomHandle type="source" position={Position.Bottom} />
    </>
  );
}