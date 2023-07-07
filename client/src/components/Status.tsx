type Props = {
  label: string;
  colorVariant: string;
};

const Status = ({ label, colorVariant }: Props) => {
  const colorVariants: any = {
    green: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-600",
    },
    slate: {
      bg: "bg-slate-200",
      border: "border-slate-300",
      text: "text-slate-400",
    },
  };
  return (
    <>
      <div
        className={`flex w-fit justify-center items-center ${colorVariants[colorVariant].bg} border ${colorVariants[colorVariant].border} rounded-md px-2`}
      >
        <h6 className={`text-sm ${colorVariants[colorVariant].text}`}>
          {label}
        </h6>
      </div>
    </>
  );
};

export default Status;
