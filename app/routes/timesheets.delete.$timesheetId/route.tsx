import { redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";

export const action: ActionFunction = async ({ params }) => {
  try {
    const db = await getDB();

    const eventId = params.eventId;
    if (!eventId) {
      throw new Response("Event ID required", { status: 400 });
    }

    await db.run(`DELETE FROM events WHERE id = ?`, eventId);

    return redirect("/timesheets");
  } catch (error) {
    console.error("Delete action error:", error);
    throw error;
  }
};

export default function DeleteEventPage() {
  return <p>Deleting event...</p>;
}
