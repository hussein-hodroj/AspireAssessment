import { useLoaderData, Form, redirect, type LoaderFunction, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";
import EventForm from "~/components/time_sheet_form";

export const loader: LoaderFunction = async () => {
  return {}; 
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const date_time = formData.get("date_time");
  const location = formData.get("location");
  const description = formData.get("description") || "";  
  const status = formData.get("status") || "";            

  if (
    typeof title !== "string" ||
    typeof date_time !== "string" ||
    typeof location !== "string"
  ) {
    throw new Response("Form data invalid", { status: 400 });
  }

  const db = await getDB();
  await db.run(
    `INSERT INTO events (title, date_time, location, description, status)
     VALUES (?, ?, ?, ?, ?)`,
    [title, date_time, location, description, status]
  );

  return redirect("/timesheets");
};

export default function NewEventPage() {
  return (
    <div>
      <EventForm type="create" />
    </div>
  );
}
