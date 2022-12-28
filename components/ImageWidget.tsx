const ImageWidget = ({ label, images }) => {
  return (
    <div className="my-4 lg:my-8">
      <div
        className={
          " rounded-t-lg bg-subtler border-solid border border-b-0 uppercase font-bold text-sm py-2 px-4"
        }
      >
        {label}
      </div>
      <div
        className={
          "border-subtler bg-subtle text-gray-500" +
          " py-2 items-center rounded-b-lg border-b border-x flex overflow-x-scroll"
        }
      >
        {images.map((item) => (
          <div key={item} className={"px-4 border-solid flex-1"}>
            <img src={item} style={{ maxWidth: "300px" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageWidget;
