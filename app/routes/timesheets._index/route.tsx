import { Form, useLoaderData, useSubmit, type LoaderFunction } from "react-router";
import { useRef, useState } from "react";
import { getDB } from "~/db/getDB";
import TimeSheetTable from "~/components/timesheets_table";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") ?? "";

  const db = await getDB();

  let baseSQL = `
    SELECT * FROM events
  `;

  const conditions: string[] = [];
  const params: any[] = [];

  if (search) {
    conditions.push(`(
      title LIKE ? OR
      date_time LIKE ? OR
      location LIKE ? OR
      description LIKE ? OR
      status LIKE ?
    )`);
    params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (conditions.length) {
    baseSQL += ` WHERE ${conditions.join(" AND ")}`;
  }

  const events = await db.all(baseSQL, ...params);

  return { events, search };
};

export default function EventsPage() {
  const { events, search } = useLoaderData() as {
    events: {
      id: number;
      title: string;
      date_time: string;
      location: string;
      description?: string;
      status?: string;
    }[];
    search: string;
  };

  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex items-end justify-between mb-8">
        <div className="flex gap-4 mb-6">
          <span className="px-6 py-3 font-semibold rounded-lg shadow bg-blue-600 text-white">
            Table
          </span>
        </div>

        <Form method="get" ref={formRef} className="flex gap-4 mb-6 w-2/3">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search events (title, location, status...)"
            className="w-full px-4 py-2 border rounded shadow-sm"
            onChange={() => submit(formRef.current)}
            autoComplete="off"
          />
        </Form>

        <div className="flex gap-4 mb-6">
          <a
            className="px-6 py-3 font-semibold rounded-lg shadow hover:bg-green-700"
            href="/timesheets/new"
          >
            New Event
          </a>
        </div>
      </div>

      <TimeSheetTable timeSheets={events} />

      <hr />
    </div>
  );
}
