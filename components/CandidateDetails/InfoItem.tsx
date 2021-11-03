export interface infoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: infoItemProps) {
  return (
    <div className="flex flex-col mt-2">
      <p className="text-gray-500 font-bold ml-1 uppercase">{label}</p>
      <p className="text-gray-700 ml-1">{value}</p>
    </div>
  );
}

export default InfoItem;
