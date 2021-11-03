import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function SelectionFilter({ data, selected, setSelected }: any) {
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-48 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map((item: any, Idx: number) => (
                <Listbox.Option
                  key={Idx}
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium text-blue-600" : "font-normal"
                        } block truncate flex items-center`}
                      >
                        {/* {item.code ? (
                          <img className="h-4 w-4 mr-1" src={`https://www.countryflags.io/${item?.code?.toLowerCase()}/shiny/64.png`} />
                        ) : null} */}
                        {item.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? "text-amber-600" : "text-amber-600"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5 text-blue-600" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default SelectionFilter;
