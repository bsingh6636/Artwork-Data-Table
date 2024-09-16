import React, { useState, useEffect } from "react";
import { DataTable, DataTableSelectionChangeEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { ProgressSpinner } from "primereact/progressspinner";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // Core PrimeReact styles
import "primeicons/primeicons.css"; // PrimeReact icons
import OverlayPaneel from "./pages/OverlayPanel";
import "./App.css";

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [page, setPage] = useState(0);
  const [pendingSelection, setPendingSelection] = useState(0);
  const [rowsToSelectFromNextPages, setRowsToSelectFromNextPages] = useState(0);
  const rowsPerPage = 12;

  useEffect(() => {
    fetchData(page + 1);
  }, [page]);

  const fetchData = async (pageNumber: number) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${pageNumber}`
      );
      const jsonResponse = await response.json();
      setData(jsonResponse.data);
      setTotalRecords(jsonResponse.pagination.total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handlePageChange = async (event: any) => {
    setPage(event.page);
    const nextPage = event.page + 1;
    
    const updatedSelectedRows = { ...selectedRows };
  
    // Fetch new data for the next page
    const nextPageData = await fetchData(nextPage);
    
    // Only select remaining rows if there are still rows to select from the next pages
    if (rowsToSelectFromNextPages > 0) {
      const availableRowsOnNextPage = nextPageData.filter(
        (row: Artwork) => !updatedSelectedRows[row.id]
      );
      const rowsToSelect = Math.min(rowsToSelectFromNextPages, availableRowsOnNextPage.length);
  
      // Select the rows from the next page
      availableRowsOnNextPage.slice(0, rowsToSelect).forEach((row: Artwork) => {
        updatedSelectedRows[row.id] = true;
      });
  
      // Adjust the remaining rows to select after applying selections from the next page
      setRowsToSelectFromNextPages(rowsToSelectFromNextPages - rowsToSelect);
    }
  
    setSelectedRows(updatedSelectedRows);
    console.log("Updated selected rows after page change:", updatedSelectedRows);
  };
  
  const handleRowSelectionFromOverlay = (numRows: number) => {
    let selected = { ...selectedRows };
    let totalRowsSelected = Object.keys(selected).length;
    let remainingRows = numRows - totalRowsSelected;
  
    // Select rows from the current page
    const availableRowsOnCurrentPage = data.filter((row) => !selected[row.id]);
    const rowsToSelectFromCurrentPage = Math.min(remainingRows, availableRowsOnCurrentPage.length);
  
    availableRowsOnCurrentPage.slice(0, rowsToSelectFromCurrentPage).forEach((row) => {
      selected[row.id] = true;
    });
  
    // Check if we still have rows to select from future pages
    const remainingRowsToSelectFromNextPage = remainingRows - rowsToSelectFromCurrentPage;
  
    if (remainingRowsToSelectFromNextPage > 0) {
      // Store the number of rows that need to be selected from the next page
      setRowsToSelectFromNextPages(remainingRowsToSelectFromNextPage);
    } else {
      setRowsToSelectFromNextPages(0); // No remaining rows to select
    }
  
    setSelectedRows(selected);
    console.log("Updated selected rows:", selected);
  };
  


  

  const handleSelectionChange = (e: DataTableSelectionChangeEvent) => {
    // Create a new object for the selected rows
    const newSelectedRows: { [key: string]: boolean } = {};
  
    // Iterate through the selected rows from the event
    if (Array.isArray(e.value)) {
      e.value.forEach((row) => {
        const rowId = String(row.id); // Ensure rowId is a string
        newSelectedRows[rowId] = true; // Mark the row as selected
      });
    }
  
    // Update state with the new selected rows
    setSelectedRows(newSelectedRows);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="card shadow-lg rounded-lg overflow-hidden w-full  bg-white p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ProgressSpinner />
          </div>
        ) : (
          <>
            <DataTable  value={data} paginator rows={rowsPerPage} totalRecords={totalRecords} lazy  first={page * rowsPerPage} onPage={handlePageChange}  selection={Object.keys(selectedRows)
                .filter((key) => selectedRows[Number(key)])
                .map((id) => ({ id: Number(id) }))}
              onSelectionChange={handleSelectionChange} dataKey="id" className="data-table"
            >
              <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}   bodyStyle={{ padding: "1rem" }}  ></Column>
              <Column  field="title"  header={() => (
                  <div className="flex justify-between items-center">
                    <span>Title</span>
                    <OverlayPaneel onRowSelectionChange={handleRowSelectionFromOverlay} />
                  </div>
                )}
                sortable  bodyStyle={{ padding: "1rem" }}
              ></Column>
              <Column field="place_of_origin" header="Place of Origin"  sortable bodyStyle={{ padding: "1rem" }} ></Column>
              <Column field="artist_display" header="Artist Display"  sortable bodyStyle={{ padding: "1rem" }} ></Column>
              <Column   field="inscriptions" header="Inscriptions" bodyStyle={{ padding: "1rem" }}></Column>
              <Column field="date_start" header="Date Start"  sortable  bodyStyle={{ padding: "1rem" }} ></Column>
              <Column field="date_end" header="Date End" sortable bodyStyle={{ padding: "1rem" }} ></Column>
            </DataTable>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
