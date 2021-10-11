import { StarIcon } from "@heroicons/react/solid";

function FavoriteCell({ favorite }) {
  return (
    <div className="flex items-center justify-center">
      <StarIcon
        className={`${
          favorite == true ? "text-yellow-400 hover:text-gray-400" : "text-gray-400 hover:text-yellow-400"
        } h-8 w-8 hover:animate-pulse`}
      />
    </div>
  );
}

export default FavoriteCell;
