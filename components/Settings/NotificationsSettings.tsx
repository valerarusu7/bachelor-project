import FormLayout from "./FormLayout";
import Separator from "../common/Separator";

function NotificationsSettings() {
  return (
    <div>
      <FormLayout header="Notifications" helpText="Decide which communications you'd like to receive and how.">
        <fieldset>
          <legend className="text-base font-medium text-gray-900">By Email</legend>
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-700">
                  Comments
                </label>
                <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="candidates"
                  name="candidates"
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="candidates" className="font-medium text-gray-700">
                  Candidates
                </label>
                <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="offers"
                  name="offers"
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="offers" className="font-medium text-gray-700">
                  Offers
                </label>
                <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <legend className="text-base font-medium text-gray-900">Push Notifications</legend>
            <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              />
              <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                Everything
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              />
              <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                Same as email
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="push-nothing"
                name="push-notifications"
                type="radio"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              />
              <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                No push notifications
              </label>
            </div>
          </div>
        </fieldset>
      </FormLayout>
      <Separator />
    </div>
  );
}

export default NotificationsSettings;
