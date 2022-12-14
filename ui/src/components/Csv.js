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
  // const [personnelData, setPersonnelData] = useState({})
  // console.log(ctx.personnelData)

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
                // rowData={rowData}
                rowData={ctx.personnelData}
                // rowData ={ctx.searchTerm}
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

// https://www.youtube.com/watch?v=iTsgvzsgtek&t=443s
// console.log(ctx.personnel)
//   const exportCsv = () =>{
//     const row = []
//     const data = [["id","last_name", "first_name", " rank", "mos", "email",]]
//     let mapdata= ctx.personnel.map((person,i)=>{
//       row.push([person])
//       let mapdata2 = mapdata.map((per,i)=>{
//         row.push([per].join(','))
//       })
//     })
//  console.log(row)
//   }
//   exportCsv()

{
  /* <div className="csv">
      
<button onClick={handleClick}><csvlink {...csvReport}>Export to CSV</csvlink></button>
</div>

const headers = [
  { label: "Last Name", key: "firstName" },
  { label: "First Name", key: "lastName" },
  { label: "Rank", key: "email" },
  { label: "MOS", key: "age" },
  { label: "Email Address", key: "age" },
  { label: "Team", key: "age" },
  { label: "City", key: "age" },
  { label: "Country", key: "age" },
];

const handleClick= () => {

};

const data = [ctx.personnelData]

const csvReport = {
  data: data,
  headers: headers,
  filename: 'DPSA.csv'
};
console.log(data) */
}

// console.log(ctx.personnel)
// const exportCsv = () =>{
//       const row = []

//       const data = [["id","last_name", "first_name", " rank", "mos", "email"]]
//       const personnel= ctx.personnel.map(person=>{
//           row.push(person)
//         })

//         const combined= row.map(ro=>{
//           data.push(ro)
//         })

//   console.log(data)
//    console.log(row)
//     }
//     exportCsv()

//https://www.ag-grid.com/react-data-grid/csv-export/#example-csv-export-column-separator

// const addpersonnel=()=>{
//   let result = []

//   const personnel= ctx.personnelData.map(person =>{
//     // console.log(person)
//     return result.push(person)

//  })
//   //  console.log("result:",result)
// }
//   // console.log("result:",result)
// addpersonnel()
// // console.log(addpersonnel())

// const [columnDefs, setColumnDefs] = useState([
//   { field: 'id' },
//   { field: 'first_name' },
//   { field: 'last_name' },
//   { field: 'rank' },
//   { field: 'mos' },
//   { field: 'email' },
//   { field: 'status' },
//   { field:  "team_name"},
//   { field:  "location"},
// ]);
