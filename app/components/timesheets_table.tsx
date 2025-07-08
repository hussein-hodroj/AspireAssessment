import { FaEdit, FaTrash } from "react-icons/fa";
import { Form, Link } from "react-router";
import { type ColumnFields } from "~/structures/column_fileds";
import {type TimeSheet } from "~/structures/time_sheet";
import { type Props } from '~/structures/time_sheet_props'

  export default function TimeSheetTable({ timeSheets }: Props) {
    const columns: ColumnFields[] = [
        { key: "id", label: "ID" },
        { key: "title", label: "Title" },
        { key: "date_time", label: "Date/Time" },
        { key: "location", label: "Location" },
        { key: "description", label: "Description" },
      ];
    return(
    <div className="w-full flex justify-center overflow-x-auto">
    <table className="table-fixed w-full border border-gray-300 rounded-lg bg-white shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          {columns.map(({ key, label }) => (
            <th key={key} className="border px-4 py-2 text-center whitespace-nowrap">
              {label.toUpperCase()}
            </th>
          ))}

          <th className="w-2/12 border px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {timeSheets.map((timeSheet: TimeSheet) => (
          <tr key={timeSheet.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2 text-center">{timeSheet.id}</td>
            <td className="border px-4 py-2 text-center truncate">{timeSheet.title}</td>
            <td className="border px-4 py-2 text-center truncate">{timeSheet.date_time}</td>
            <td className="border px-4 py-2 text-center truncate">{timeSheet.location}</td>
            <td className="border px-4 py-2 text-center truncate">{timeSheet.description}</td>
            <td className="border py-3 px-3 flex justify-center items-center">

              <Link
                to={`/timesheets.edit/${timeSheet.id}`}
                className="text-blue-600 hover:text-blue-800 transition"
                title="Edit"
              >
                <FaEdit size={20} />
              </Link>
             <Form
                  method="post"
                  action={`/timesheets.delete/${timeSheet.id}`}
                  onSubmit={(e) => {
                    if (
                      !confirm(`Are you sure you want to delete event "${timeSheet.title}"?`)
                    ) {
                      e.preventDefault();
                    }
                  }}
                >
                  <button
                    type="submit"
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
                    aria-label={`Delete event ${timeSheet.title}`}
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                  >
                    <FaTrash size={20} />
                  </button>
                </Form>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    )
}