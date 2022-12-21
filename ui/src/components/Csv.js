import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useContext,
} from "react";
import { ContextProvider, GlobalContext } from "../Context/GlobalContext";
import { CSVLink } from "react-csv";
import DownloadIcon from "@mui/icons-material/Download";

import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Csv = () => {
  const ctx = useContext(GlobalContext);

  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  const [columnDefs, setColumnDefs] = useState([
    { field: "id" },
    { field: "last_name" },
    { field: "first_name" },
    { field: "rank" },
    { field: "mos" },
    { field: "email" },
    { field: "status" },
    { field: "team_name" },
    { field: "city_base" },
    { field: "country" },
    { field: "deployment_start" },
    { field: "deployment_end" },
  ]);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const onBtnUpdate = useCallback(() => {
    document.querySelector("#csvResult").value =
      gridRef.current.api.getDataAsCsv();
  }, []);

  return (
    <div>
      <div>
        <div>
          <DownloadIcon className="download-button" onClick={onBtnExport}>
            Download Personnel
          </DownloadIcon>
        </div>
        <div>
          <div>
            <div>
              <AgGridReact
                ref={gridRef}
                rowData={ctx.personnelData}
                defaultColDef={defaultColDef}
                suppressExcelExport={true}
                popupParent={popupParent}
                columnDefs={columnDefs}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Csv;
