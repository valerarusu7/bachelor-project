function FormLayout({ children, header, helpText, edit, onEdit, onSubmit }) {
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {header}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{helpText}</p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        {edit == true ? (
          <form action="#" method="POST" onSubmit={onSubmit}>
            <div className="shadow-lg rounded-lg sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {children}
              </div>
              <div className="px-4 py-3 bg-white text-right sm:px-6">
                <button
                  type="reset"
                  onClick={onEdit}
                  className="inline-flex justify-center mr-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="shadow-lg sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              {children}
            </div>
            <div className="px-4 py-3 bg-white text-right sm:px-6">
              <button
                type="reset"
                onClick={onEdit}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormLayout;
