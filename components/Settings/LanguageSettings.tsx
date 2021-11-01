import FormLayout from "./FormLayout";

function LanguageSettings() {
  return (
    <FormLayout header="Language" helpText="Select the language for the system.">
      <div className="flex flex-col">
        <div>
          <legend className="text-base font-medium text-gray-900">Current Language</legend>
          <p className="text-sm text-gray-500">This is the language in the system.</p>
        </div>
        <div className="flex items-center mt-2">
          <div className="mr-2 flex items-center"></div>
          <p className="font-semibold text-sm text-gray-700">English</p>
        </div>
      </div>
      <fieldset>
        <div>
          <legend className="text-base font-medium text-gray-900">Select Language</legend>
          <p className="text-sm text-gray-500">By changing the language you change it for the whole system.</p>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <input id="english" name="language" type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
            <div className="ml-3 flex items-center"></div>
            <label htmlFor="english" className="ml-2 block text-sm font-medium text-gray-700">
              English
            </label>
          </div>
          <div className="flex items-center">
            <input id="danish" name="language" type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
            <div className="ml-3 flex items-center"></div>
            <label htmlFor="danish" className="ml-2 block text-sm font-medium text-gray-700">
              Danish
            </label>
          </div>
        </div>
      </fieldset>
    </FormLayout>
  );
}

export default LanguageSettings;
