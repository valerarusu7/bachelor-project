function Task({ id }) {
  return (
    <div className="mb-8">
      <div className="relative h-12 flex items-center">
        <div className="absolute h-0.5 w-full bg-gray-300" />
        <div className="rounded-full h-16  white absolute ml-10 flex justify-center items-center">
          <div className="p-2 bg-white">
            <p className="uppercase font-bold text-gray-400">{`Task ${id}`}</p>
          </div>
        </div>
      </div>
      <div className="ml-4">
        <p className="text-xl font-bold text-gray-800 pointer-events-none">When was Stibo founded?</p>
        <div className="flex items-center justify-evenly mt-8">
          <div className="bg-gray-300 border-2 border-gray-400 p-4 rounded-lg cursor-pointer">
            <p className="uppercase font-semibold text-gray-800 text-xl">1978</p>
          </div>
          <div className="bg-gray-300 border-2 border-gray-400 p-4 rounded-lg cursor-pointer">
            <p className="uppercase font-semibold text-gray-800 text-xl">1867</p>
          </div>
          <div className="bg-gray-300 border-2 border-gray-400 p-4 rounded-lg cursor-pointer">
            <p className="uppercase font-semibold text-gray-800 text-xl">1795</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
