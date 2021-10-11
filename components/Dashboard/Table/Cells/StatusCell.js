function StatusCell({ completed }) {
  return (
    <span
      className={`${
        completed == true
          ? " bg-green-200 text-green-600 border border-green-300"
          : " bg-yellow-200 text-yellow-600 border border-yellow-300"
      } py-1 px-3 rounded-full text-xs font-bold `}
    >
      {`${completed == true ? "Completed" : "Pending"}`}
    </span>
  );
}

export default StatusCell;
