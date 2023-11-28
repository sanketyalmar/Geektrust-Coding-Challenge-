import React from "react";
import "./DataTableHeader.css";
export default function DataTableHeader({
  selectAllPage,
  toggleSelectAllPage,
}) {
  return (
    <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            checked={selectAllPage}
            onChange={toggleSelectAllPage}
            className="checkbox"
          />
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}
