import { Handle, HandleProps } from "reactflow";

const CustomHandle = (props: HandleProps) => {
  return (
    <Handle
      style={{
        width: 8,
        height: 8,
        background: "white",
        border: "1px solid black",
      }}
      {...props}
    />
  );
};

export default CustomHandle;