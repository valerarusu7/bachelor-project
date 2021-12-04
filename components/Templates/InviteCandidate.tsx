import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { stringAvatar } from "../../helpers/stringAvatar";
import CustomButton from "../common/CustomButton";
import { useAppSelector } from "../../store/hooks";
import { selectTemplate, setInvitedCandidates, setSearch } from "../../store/reducers/template";
import { useDispatch } from "react-redux";
import { ICandidate } from "../../types";

export interface InviteCandidatesProps {
  isOpen: boolean;
  onClose: any;
  candidates: ICandidate[];
  inviteCandidates: any;
}

function InviteCandidate({ isOpen, onClose, candidates, inviteCandidates }: InviteCandidatesProps) {
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();
  const { search, invitedCandidates } = useAppSelector(selectTemplate);

  const [filteredCandidates, setFilteredCandidates] = useState<ICandidate[]>([]);

  useEffect(() => {
    if (search.length > 1) {
      let array: ICandidate[] = candidates.filter((candidate: any) => !invitedCandidates.includes(candidate));

      setFilteredCandidates(
        array.filter(
          (candidate: any) =>
            candidate.firstName.toLowerCase().includes(search.toLowerCase()) ||
            candidate.lastName.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [search]);

  function addCandidate(candidate: any) {
    let newCandidates = [...invitedCandidates];
    newCandidates.push(candidate);
    dispatch(setSearch(""));
    dispatch(setInvitedCandidates(newCandidates));
  }

  function removeCandidate(candidate: any) {
    let newCandidates = [...invitedCandidates];
    const index = newCandidates.indexOf(candidate);
    if (index > -1) {
      newCandidates.splice(index, 1);
    }
    dispatch(setInvitedCandidates(newCandidates));
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto " initialFocus={cancelButtonRef} onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="border border-gray-300 inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ">
              <div className="p-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="Search for a candidate"
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                  />
                  {search.length > 1 ? (
                    <div className="text-gray-700">
                      {filteredCandidates.length !== 0 ? (
                        <div className="absolute w-full bg-gray-100 border-l border-r border-b border-gray-200 rounded-b-lg ">
                          <div>
                            {filteredCandidates.map((candidate: any) => (
                              <div
                                key={candidate._id}
                                className="flex items-center justify-between border-b border-gray-300 p-1 pb-2 pt-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => addCandidate(candidate)}
                              >
                                <p className="text-sm">{`${candidate.firstName} ${candidate.lastName}`}</p>
                                <p className="text-sm">{candidate.email}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="absolute w-full bg-gray-100 border-l border-r border-b border-gray-200 pb-4 rounded-b-lg p-2">
                          <div className="flex justify-center items-center">
                            <p className="text-sm font-semibold">No candidates found.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
                <div className="mt-8 space-y-2">
                  {invitedCandidates.length > 0 ? (
                    invitedCandidates.map((invitedCandidate: any) => (
                      <div className="flex items-center justify-between border-b border-gray-300 pb-2 " key={invitedCandidate._id}>
                        <div className="flex">
                          <div className="bg-gradient-to-tr from-blue-600 to-blue-300 text-white w-10 h-10 rounded-full p-2 flex items-center justify-center">
                            <p className="font-semibold text-md">
                              {stringAvatar(`${invitedCandidate.firstName} ${invitedCandidate.lastName}`)}
                            </p>
                          </div>
                          <div className="text-sm ml-2 text-gray-700">
                            <p className="font-bold">{`${invitedCandidate.firstName} ${invitedCandidate.lastName}`}</p>
                            <p>{invitedCandidate.email}</p>
                          </div>
                        </div>
                        <button onClick={() => removeCandidate(invitedCandidate)}>
                          <i className="text-gray-500 text-semibold ">Remove</i>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="w-full flex justify-center items-center">
                      <p className="font-semibold text-gray-700">No candidates added</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 pr-4 py-3  flex justify-end">
                <div className="flex">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-tr from-blue-700 to-blue-400 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={inviteCandidates}
                  >
                    Invite
                  </motion.button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default InviteCandidate;
