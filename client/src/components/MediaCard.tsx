import { MdDelete } from "react-icons/md";
import { useDeletMediaMutation } from "../redux/api/fileUploadApi";
import ActionButton from "./ActionButton";

type Props = {
  id?: number;
  url: string;
  name: string;
  type: string;
};

const MediaCard = ({ id, url, name, type }: Props) => {
  const [deleteMedia] = useDeletMediaMutation();

  return (
    <>
      <div>
        {type.startsWith("image/") && (
          <>
            <img
              className="h-36 rounded-md border border-custom-600"
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
          </>
        )}
        {type.startsWith("video/") && (
          <>
            <video
              className="h-36 bg-black rounded-md border border-custom-600"
              src={url}
              controls={true}
              autoPlay={false}
            />
            {id && (
              <ActionButton
                onClick={() => deleteMedia(id)}
                Icon={<MdDelete />}
                color="red"
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MediaCard;
