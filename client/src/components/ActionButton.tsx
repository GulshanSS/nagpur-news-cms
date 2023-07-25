import { MouseEventHandler } from "react";

type Props = {
  onClick?: MouseEventHandler;
  Icon: React.ReactNode;
  color: string;
};

const ActionButton = ({ onClick, Icon, color }: Props) => {
  const colorVariants: any = {
    blue: "text-blue-500",
    red: "text-red-500",
    slate: "text-slate-500",
  };

  return (
    <>
      <button
        onClick={onClick}
        className={`flex justify-center items-center text-xl w-8 h-8 rounded-full bg-custom-100 ease-in-out duration-300 ${colorVariants[color]}`}
      >
        {Icon}
      </button>
    </>
  );
};

export default ActionButton;
