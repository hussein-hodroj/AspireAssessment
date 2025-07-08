import { useLoaderData, redirect, type LoaderFunction, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";
import EventForm from "~/components/time_sheet_form"; 

export const loader: LoaderFunction = async ({ params }) => {
  const db = await getDB();

  const event = await db.get(
   `SELECT * FROM events WHERE id = ?`,
    params.eventId
  );

  if (!event) throw new Response("Not Found", { status: 404 });

  return { event };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get("id");
  const title = formData.get("title");
  const date_time = formData.get("date_time");
  const location = formData.get("location");
  const description = formData.get("description");
  const status = formData.get("status");

  const db = await getDB();

  await db.run(
    `UPDATE events SET title = ?, date_time = ?, location = ?, description = ?, status = ? WHERE id = ?`,
    [title, date_time, location, description, status, id]
  );

  return redirect("/timesheets");
};

export default function EditEventPage() {
  const { event } = useLoaderData() as { event: any };

  return (
    <div>
      <EventForm type="update" event={event} />
    </div>
  );
}
