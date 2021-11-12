import { ChangeEventHandler } from "react";
import { IPosition } from "../../types";
import SelectionFilter from "../Dashboard/SelectionFilter";

export interface ITemplatesDetails {
  onChangeName: ChangeEventHandler<HTMLInputElement>;
  selectPosition: any;
  positions: IPosition[];
  selectedPosition: any;
  onChangeDescription: ChangeEventHandler<HTMLTextAreaElement>;
}
function TemplateDetails({
  onChangeName,
  selectPosition,
  positions,
  selectedPosition,
  onChangeDescription,
}: ITemplatesDetails) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 items-center mb-2">
        <div className="col-span-1">
          <label
            htmlFor="company-website"
            className="block text-sm font-medium text-gray-700"
          >
            Template name
          </label>
          <input
            type="text"
            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
            onChange={(e) => onChangeName(e)}
          />
        </div>
        <div>
          <label
            htmlFor="company-website"
            className="block text-sm font-medium text-gray-700"
          >
            Link to a position
          </label>

          <SelectionFilter
            data={positions}
            selected={selectedPosition}
            setSelected={(e: any) => selectPosition(e)}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="company-website"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          className="rounded-md w-1/2"
          name="template-description"
          id="template-description"
          rows={5}
          onChange={(e) => onChangeDescription(e)}
        ></textarea>
      </div>
    </div>
  );
}

export default TemplateDetails;