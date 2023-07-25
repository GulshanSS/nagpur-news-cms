type Props = {
  label: string;
  value: string;
};

const ViewItem = ({ label, value }: Props) => {
  return (
    <>
      <div className="flex flex-col">
        <span className="w-28 text-[12px] font-bold text-custom-800">
          {label}
        </span>
        <span className="font-bold text-md text-clip text-justify text-custom-900">{value}</span>
      </div>
    </>
  );
};

export default ViewItem;
