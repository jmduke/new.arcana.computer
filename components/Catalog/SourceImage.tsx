import { LEFTHAND_COLUMN_SIZE } from "lib/constants";

import TextColophon from "./TextColophon";

const ImageColophon = ({ image, alt }) =>
  image ? (
    <img
      src={image}
      alt={image}
      className="rounded-lg"
      style={{ maxWidth: LEFTHAND_COLUMN_SIZE }}
    />
  ) : (
    <TextColophon>{alt}</TextColophon>
  );

export default ImageColophon;
