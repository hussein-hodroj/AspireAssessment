import { Form, useSubmit } from "react-router";
import { useState } from "react";
import type { TimeSheetFormType } from "../structures/time_sheet_form";

export default function EventForm({ type, event }: TimeSheetFormType) {
  const submit = useSubmit();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (eventForm: React.FormEvent<HTMLFormElement>) => {
    eventForm.preventDefault();
    const form = eventForm.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("title")?.toString().trim() || "";
    const date_time = formData.get("date_time")?.toString().trim() || "";
    const location = formData.get("location")?.toString().trim() || "";
    const description = formData.get("description")?.toString().trim() || "";
    const status = formData.get("status")?.toString().trim() || "";

    const newErrors: Record<string, string> = {};
    if (!title) newErrors.title = "Title is required";
    if (!date_time) newErrors.date_time = "Date and time are required";
    else if (isNaN(Date.parse(date_time))) newErrors.date_time = "Invalid date format";
    if (!location) newErrors.location = "Location is required";
    if (!description) newErrors.description = "Description is required";
    if (!status) newErrors.status = "Status is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    submit(form, { method: "post" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Form method="post" onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {type === "create" ? "Create New Event" : "Update Event"}
        </h2>

        {type === "update" && (
          <input type="hidden" name="id" defaultValue={event?.id} />
        )}

        <div className="grid grid-cols-1 gap-y-6">
          {[
            { id: "title", label: "Title", type: "text", value: event?.title || "" },
            { id: "date_time", label: "Date & Time", type: "datetime-local", value: event?.date_time || "" },
            { id: "location", label: "Location", type: "text", value: event?.location || "" },
            { id: "description", label: "Description", type: "text", value: event?.description || "" },
          ].map(({ id, label, type, value }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-900">
                {label}
              </label>
              <div className="mt-2">
                <input
                  id={id}
                  name={id}
                  type={type}
                  defaultValue={value}
                  className={`block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline outline-1 ${
                    errors[id] ? "outline-red-500" : "outline-gray-300"
                  } placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm`}
                />
                {errors[id] && <p className="text-sm text-red-600 mt-1">{errors[id]}</p>}
              </div>
            </div>
          ))}

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-900">
              Status
            </label>
            <div className="mt-2">
              <select
                id="status"
                name="status"
                defaultValue={event?.status || ""}
                className={`block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline outline-1 ${
                  errors.status ? "outline-red-500" : "outline-gray-300"
                } focus:outline-2 focus:outline-indigo-600 sm:text-sm`}
              >
                <option value="">Select status</option>
                <option value="upcoming">Upcoming</option>
                <option value="attending">Attending</option>
                <option value="maybe">Maybe</option>
                <option value="declined">Declined</option>
              </select>
              {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status}</p>}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-x-6">
          <a href="/events" className="text-sm font-semibold text-gray-900">
            Back
          </a>
          <button
            type="submit"
            className="rounded-md cursor-pointer bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
