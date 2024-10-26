import { nanoid } from "nanoid";

export const initialNodes = [
  {
    id: nanoid(),
    position: { x: 0, y: 0 },
    data: {},
    type: "input",
  },
];
export const initialEdges = [];