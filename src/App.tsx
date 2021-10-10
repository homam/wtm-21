import React from "react";
import DataTable from "react-data-table-component";
import { useFetch } from "usehooks-ts";
import { Attendee } from "./Attendee";
import styled from "styled-components";
import "./styles.css";
import { ExpandedComponent } from "./ExpandedComponent";

const columns = [
  {
    name: "Name",
    selector: (d: Attendee) => d.name,
    sortable: true
  },
  {
    name: "Company",
    selector: (d: Attendee) => d.company,
    sortable: true
  },
  {
    name: "Title",
    selector: (d: Attendee) => d.job_title
  },
  {
    name: "Categories",
    selector: (d: Attendee) => d.business_category.join(", ")
  }
];

const TextField = styled.input`
  height: 32px;

  width: 200px;

  border-radius: 3px;

  border-top-left-radius: 5px;

  border-bottom-left-radius: 5px;

  border-top-right-radius: 0;

  border-bottom-right-radius: 0;

  border: 1px solid #e5e5e5;

  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;

  border-bottom-left-radius: 0;

  border-top-right-radius: 5px;

  border-bottom-right-radius: 5px;

  height: 34px;

  width: 32px;

  text-align: center;

  display: flex;

  align-items: center;

  justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />

    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

function RenderAttendees({ data }: { data: Attendee[] }) {
  const [filterText, setFilterText] = React.useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const filteredItems = data.filter(
    (item: Attendee) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.company.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);

        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      expandableRows={true}
      expandableRowsComponent={ExpandedComponent}
      expandableRowExpanded={() => !true}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
    />
  );
}

export default function App() {
  const { data, error } = useFetch<Attendee[]>("./attendees.json");

  if (error) return <p>There is an error.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <RenderAttendees data={data} />
    </div>
  );
}
