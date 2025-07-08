import { redirect } from "react-router"

export async function loader() {

  return redirect("/timesheets")
}

export default function RootPage() {
  return <></>
}
