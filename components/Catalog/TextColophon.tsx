import { LEFTHAND_COLUMN_SIZE } from "lib/constants";

const TextColophon = ({ children }) => (
  <div
    className="bg-subtle rounded-lg text-center flex items-center justify-center text-gray-500 text-lg mb-2"
    style={{
      width: LEFTHAND_COLUMN_SIZE,
      height: LEFTHAND_COLUMN_SIZE,
    }}
  >
    {children}
  </div>
);

export default TextColophon;
