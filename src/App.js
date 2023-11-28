import React, { useState, useEffect } from "react";
import MemberTable from "./DataTable";
import MemberPagination from "./Pagination";
import "./App.css";

export default function FullWidthTextField() {
  const [searchText, setSearchText] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const totalPages = Math.ceil(
    members.filter((member) => {
      const { name, email, role } = member;
      return (
        name.toLowerCase().includes(searchText.toLowerCase()) ||
        email.toLowerCase().includes(searchText.toLowerCase()) ||
        role.toLowerCase().includes(searchText.toLowerCase())
      );
    }).length / 10
  );

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      const parsedPage = parseInt(storedPage);
      if (parsedPage > 0 && parsedPage <= totalPages) {
        setCurrentPage(parsedPage);
      } else {
        setCurrentPage(1);
      }
    } else {
      setCurrentPage(1);
    }
  }, [totalPages, setCurrentPage]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const handleDeleteSelected = () => {
    const updatedMembers = members.filter(
      (member) => !selectedMembers.includes(member.id)
    );
    const updatedSortedMembers = sortedMembers.filter(
      (member) => !selectedMembers.includes(member.id)
    );

    setMembers(updatedMembers);
    setSelectAllDisplayed(false);
    setSelectedMembers([]);
  };

  const filteredMembers = members.filter((member) => {
    const { name, email, role } = member;
    return (
      name.toLowerCase().includes(searchText.toLowerCase()) ||
      email.toLowerCase().includes(searchText.toLowerCase()) ||
      role.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const handleSelectMember = (member) => {
    if (selectedMembers.includes(member)) {
      setSelectedMembers(selectedMembers.filter((m) => m !== member));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  return (
    <div className="app-container">
      <input
        type="text"
        placeholder="Search by name, email, or role"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="table-container">
        <MemberTable
          searchText={searchText}
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          membersPerPage={10}
          members={members}
          setMembers={setMembers}
        />
      </div>
      <MemberPagination
        selectedMembers={selectedMembers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filteredMembers={filteredMembers}
      />
    </div>
  );
}
