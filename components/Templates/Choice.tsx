import { CheckIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { editChoice, removeChoice, selectTemplate, } from "../../store/reducers/template";

export interface IEmailChoice {
  id: number;
}

function EmailChoice({ id }: IEmailChoice) {
  const dispatch = useAppDispatch()
  const { templateChoices } = useAppSelector(selectTemplate)
  const [choice, setStateChoice] = useState({ value: '', isCorrect: false})

  useEffect(() => {
    dispatch(editChoice({id: id-1, value: choice.value, isCorrect: choice.isCorrect}))
  }, [choice])

  return (
    <div className="flex items-center mt-2">
      
      <div className="w-20">
        <p className="mr-4 text-sm font-medium text-gray-700">{`Choice ${id}`}</p>
      </div>
      <textarea
        className="focus:ring-blue-500 focus:border-blue-500 w-1/2 rounded-md sm:text-sm border-gray-300"
        rows={2}
        onChange={(e) => setStateChoice({...choice, value: e.target.value})}
      />
      {choice.isCorrect ? (
        <button
            className={`bg-gradient-to-tr from-green-500 to-green-400 ml-4 text-white font-semibold pl-4 pr-4 pt-2 pb-2 rounded-lg shadow-lg hover:opacity-80`}
            onClick={() => setStateChoice({...choice, isCorrect: false})}
        >
          <CheckIcon className='h-6 w-6 text-white'/>
        </button>
      ) : (
          <button
            className={`bg-gradient-to-tr from-green-500 to-green-400 ml-4 text-white font-semibold pl-4 pr-4 pt-2 pb-2 rounded-lg shadow-lg hover:opacity-80 opacity-50`}
            onClick={() => setStateChoice({...choice, isCorrect: true})}
        >
          <CheckIcon className='h-6 w-6 text-white'/>
        </button>
      )}
      {id === templateChoices.length && templateChoices.length != 2 ? (          <button
            className={`bg-gradient-to-tr from-red-500 to-red-400 ml-4 text-white font-semibold pl-4 pr-4 pt-2 pb-2 rounded-lg shadow-lg hover:opacity-80`}
            onClick={() => dispatch(removeChoice(id-1))}
        >
          <p>Remove</p>
        </button>
): null}
    </div>
  );
}

export default EmailChoice;
