import { CheckIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { editChoice, removeChoice, selectTemplate } from "../../store/reducers/template";
import CustomButton from "../common/CustomButton";

export interface IEmailChoice {
  id: number;
}

function EmailChoice({ id }: IEmailChoice) {
  const dispatch = useAppDispatch();
  const { templateChoices } = useAppSelector(selectTemplate);
  const [choice, setStateChoice] = useState({ value: "", isCorrect: false });

  useEffect(() => {
    dispatch(editChoice({ id: id - 1, value: choice.value, isCorrect: choice.isCorrect }));
  }, [choice]);

  return (
    <AnimatePresence>
      <motion.div
        className="flex items-center mt-2"
        initial="pre"
        animate="visible"
        exit={{ opacity: 0 }}
        variants={{
          pre: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <div className="w-20">
          <p className="mr-4 text-sm font-medium text-gray-700">{`Choice ${id}`}</p>
        </div>
        <textarea
          className="focus:ring-blue-500 focus:border-blue-500 w-1/2 rounded-md sm:text-sm border-gray-300"
          rows={2}
          onChange={(e) => setStateChoice({ ...choice, value: e.target.value })}
        />
        {choice.isCorrect ? (
          <CustomButton
            color="green"
            onClick={() => setStateChoice({ ...choice, isCorrect: false })}
            customStyles="ml-4"
          >
            <CheckIcon className="h-6 w-6 text-white" />
          </CustomButton>
        ) : (
          <CustomButton
            color="green"
            onClick={() => setStateChoice({ ...choice, isCorrect: true })}
            disabled={true}
            customStyles="ml-4"
          >
            <CheckIcon className="h-6 w-6 text-white" />
          </CustomButton>
        )}
        {id === templateChoices.length && templateChoices.length != 2 ? (
          <CustomButton color="red" onClick={() => dispatch(removeChoice(id - 1))} customStyles="ml-4">
            <p>Remove</p>
          </CustomButton>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
}

export default EmailChoice;
