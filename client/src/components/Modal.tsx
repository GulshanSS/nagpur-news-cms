import { IoIosCloseCircle } from "react-icons/io";
import ActionButton from "./ActionButton";
import React from "react";

type Props = {
  id: string;
  children: JSX.Element;
  close: boolean;
  setClose: Function;
};

const Modal = ({ id, children, close, setClose }: Props) => {
  if (!close) {
    return null;
  }

  const handleOnClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLInputElement).id === id) setClose(false);
  };

  return (
    <>
      <div
        id={id}
        className="fixed inset-0 bg-custom-900 bg-opacity-30 flex justify-center items-center backdrop-blur-sm z-50"
        onClick={(e) => handleOnClose(e)}
      >
        <div className="flex flex-col items-end">
          <div className="mb-2 mr-2">
            <ActionButton
              onClick={() => setClose(false)}
              Icon={<IoIosCloseCircle />}
              color="slate"
            />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
