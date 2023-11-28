import React from "react";
import "./DataTableRow.css";
export default function DataTableRow({
  member,
  selectedRowIds,
  editingMemberId,
  handleRowSelection,
  handleEdit,
  handleDelete,
  handleSaveEdit,
  editedName,
  editedEmail,
  editedRole,
  setEditedName,
  setEditedEmail,
  setEditedRole,
}) {
  return (
    <tr
      key={member.id}
      className={selectedRowIds.includes(member.id) ? "selected-row" : ""}
    >
      <td>
        <input
          type="checkbox"
          checked={selectedRowIds.includes(member.id)}
          onChange={() => handleRowSelection(member.id)}
          className="checkbox"
        />
      </td>
      <td>
        {editingMemberId === member.id ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          member.name
        )}
      </td>
      <td>
        {editingMemberId === member.id ? (
          <input
            type="text"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
        ) : (
          member.email
        )}
      </td>
      <td>
        {editingMemberId === member.id ? (
          <input
            type="text"
            value={editedRole}
            onChange={(e) => setEditedRole(e.target.value)}
          />
        ) : (
          member.role
        )}
      </td>
      <td>
        {editingMemberId === member.id ? (
          <div>
            <button
              onClick={() => handleSaveEdit(member.id)}
              className="button"
            >
              Save
            </button>
            <button onClick={() => setEditingMemberId(null)} className="button">
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() =>
                handleEdit(member.id, member.name, member.email, member.role)
              }
              className="button"
            >
              Edit
            </button>
            <button onClick={() => handleDelete(member.id)} className="button">
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
