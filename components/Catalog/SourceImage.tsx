import TextColophon from "./TextColophon";

const ImageColophon = ({ image }) =>
  image ? (
    <img src={image} alt={image} className="rounded-lg" />
  ) : (
    <TextColophon>No image.</TextColophon>
  );

export default ImageColophon;
