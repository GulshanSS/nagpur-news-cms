import { MdDelete } from "react-icons/md";
import { useDeletMediaMutation } from "../redux/api/fileUploadApi";
import ActionButton from "./ActionButton";

type Props = {
  id?: number;
  url: string;
  name: string;
};

const ImageCard = ({ id, url, name }: Props) => {
  const [deleteMedia] = useDeletMediaMutation();

  return (
    <>
      <div>
        <img
          className="h-20 rounded-md border border-slate-200"
          src={url}
          alt={name}
        />
        {id && (
          <ActionButton
            onClick={() => deleteMedia(id)}
            Icon={<MdDelete />}
            color="red"
          />
        )}
      </div>
    </>
  );
};

export default ImageCard;
