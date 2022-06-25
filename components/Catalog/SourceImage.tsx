import { LEFTHAND_COLUMN_SIZE } from "lib/constants";

import TextColophon from "./TextColophon";

const ImageColophon = ({ image }) =>
  image ? (
    <img
      src={image}
      alt={image}
      className="rounded-lg"
      style={{ maxWidth: LEFTHAND_COLUMN_SIZE }}
    />
  ) : (
    <TextColophon>No image.</TextColophon>
  );

export default ImageColophon;
