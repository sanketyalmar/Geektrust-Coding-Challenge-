import React, { useState, useEffect } from "react";
import DataTableHeader from "./DataTableHeader";
import DataTableRow from "./DataTableRow";
import "./DataTable.css";
import "./DataTableHeader.css";
import "./DataTableRow.css";

export default function MemberTable({
  searchText,
  selectedMembers,
  setSelectedMembers,
  currentPage,
  members,
  setMembers,
  setCurrentPage,
  membersPerPage,
  loading,
}) {
  const handleDeleteSelectedClick = () => {
    handleDeleteSelected();
  };
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectAllPage, setSelectAllPage] = useState(false);
  const [pageSelectedRowIds, setPageSelectedRowIds] = useState([]);

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
    )
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
        const storedPage = localStorage.getItem("currentPage");
        if (storedPage) {
          setCurrentPage(parseInt(storedPage));
        } else {
          setCurrentPage(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [setCurrentPage]);

  const handleEdit = (memberId, name, email, role) => {
    setEditingMemberId(memberId);
    setEditedName(name);
    setEditedEmail(email);
    setEditedRole(role);
  };

  const handleSaveEdit = (memberId) => {
    setEditingMemberId(null);
    const updatedMembers = members.slice();
    const updatedSortedMembers = updatedMembers.slice();

    const index = updatedMembers.findIndex((member) => member.id === memberId);

    if (index !== -1) {
      updatedMembers[index] = {
        ...updatedMembers[index],
        name: editedName,
        email: editedEmail,
        role: editedRole,
      };
      updatedSortedMembers[index] = {
        ...updatedSortedMembers[index],
        name: editedName,
        email: editedEmail,
        role: editedRole,
      };
      setMembers(updatedMembers);
    }
    setEditedName("");
    setEditedEmail("");
    setEditedRole("");
  };

  const handleDelete = (memberId) => {
    const updatedSelectedMembers = selectedMembers.filter(
      (id) => id !== memberId,
    );
    setSelectedMembers(updatedSelectedMembers);

    const updatedMembers = members.filter(
      (member) => !selectedRowIds.includes(member.id),
    );
    setMembers(updatedMembers);
    const updatedSortedMembers = updatedMembers.slice();

    const indexToDelete = updatedMembers.findIndex(
      (member) => member.id === memberId,
    );

    if (indexToDelete !== -1) {
      updatedMembers.splice(indexToDelete, 1);
      updatedSortedMembers.splice(indexToDelete, 1);
      setMembers(updatedMembers);
    }
  };

  const handleDeleteSelected = () => {
    const updatedSelectedMembers = selectedMembers.filter(
      (memberId) => !selectedRowIds.includes(memberId),
    );
    setSelectedMembers(updatedSelectedMembers);
    const updatedMembers = members.filter(
      (member) => !selectedRowIds.includes(member.id),
    );
    setMembers(updatedMembers);
    setSelectedRowIds([]);
  };

  const handleRowClick = (memberId) => {
    if (selectedRowIds.includes(memberId)) {
      setSelectedRowIds(selectedRowIds.filter((id) => id !== memberId));
    } else {
      setSelectedRowIds([...selectedRowIds, memberId]);
    }
  };

  const handleRowSelection = (memberId) => {
    if (selectedRowIds.includes(memberId)) {
      setSelectedRowIds(selectedRowIds.filter((id) => id !== memberId));
    } else {
      setSelectedRowIds([...selectedRowIds, memberId]);
    }
  };

  const toggleSelectAllPage = () => {
    setSelectAllPage(!selectAllPage);
    if (!selectAllPage) {
      const pageMemberIds = currentMembers.map((member) => member.id);
      setSelectedMembers((prevSelectedMembers) => [
        ...new Set([...prevSelectedMembers, ...pageMemberIds]),
      ]);
      setSelectedRowIds((prevSelectedRowIds) => [
        ...new Set([...prevSelectedRowIds, ...pageMemberIds]),
      ]);
    } else {
      setSelectedMembers((prevSelectedMembers) =>
        prevSelectedMembers.filter(
          (memberId) =>
            !currentMembers.map((member) => member.id).includes(memberId),
        ),
      );
      setSelectedRowIds((prevSelectedRowIds) =>
        prevSelectedRowIds.filter(
          (memberId) =>
            !currentMembers.map((member) => member.id).includes(memberId),
        ),
      );
    }
  };

  const filteredMembers = members.filter((member) => {
    const { name, email, role } = member;
    return (
      name.toLowerCase().includes(searchText.toLowerCase()) ||
      email.toLowerCase().includes(searchText.toLowerCase()) ||
      role.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = Math.min(
    startIndex + membersPerPage,
    filteredMembers.length,
  );
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  const renderRows = currentMembers.map((member) => (
    <DataTableRow
      key={member.id}
      member={member}
      selectedRowIds={selectedRowIds}
      editingMemberId={editingMemberId}
      handleRowSelection={handleRowSelection}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleSaveEdit={handleSaveEdit}
      editedName={editedName}
      editedEmail={editedEmail}
      editedRole={editedRole}
      setEditedName={setEditedName}
      setEditedEmail={setEditedEmail}
      setEditedRole={setEditedRole}
    />
  ));

  return (
    <div className="table-container">
      <table className="table">
        <DataTableHeader
          selectAllPage={selectAllPage}
          toggleSelectAllPage={toggleSelectAllPage}
        />
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="loading-message">
                Loading...
              </td>
            </tr>
          ) : filteredMembers.length === 0 ? (
            <tr>
              <td colSpan={5} className="no-records-message">
                No matching records found.
              </td>
            </tr>
          ) : (
            renderRows
          )}
        </tbody>
      </table>
      <button
        onClick={handleDeleteSelectedClick}
        className="delete-selected-button"
        style={{ marginTop: "20px" }}
      >
        DELETE SELECTED
      </button>
    </div>
  );
}
