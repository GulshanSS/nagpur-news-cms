type Props = {
  url: string;
  name: string;
};

const ImageCard = ({ url, name }: Props) => {
  return (
    <>
      <img
        className="h-20 rounded-md border border-slate-200"
        src={url}
        alt={name}
      />
    </>
  );
};

export default ImageCard;
