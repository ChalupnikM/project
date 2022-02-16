import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ViewHistoryWrapper, ViewWithoutHistoryWrapper } from '../components/molecules/ViewWrapper';
import { useSelector } from 'react-redux';
import { Wrapper } from '../components/Organism/Navigation.styles';
import { useDemoData } from '@mui/x-data-grid-generator';

const columns = [
  { field: 'date', headerName: 'Date', width: 200 },
  { field: 'city', headerName: 'City', width: 130 },
  { field: 'street', headerName: 'Street', width: 130 },
  {
    field: 'number',
    headerName: 'Number',
    type: 'number',
    width: 150,
  },
];
export default function DataTable() {
  const [pageSize, setPageSize] = React.useState(5);
  const rows = useSelector(state => state.plots);

  const newArray = rows.filter(obj => {
      return obj.city !== "" ;
  });

  const handleRemove = (i) => {
    console.log(i)
  }

  return (
    <>
      {
        newArray.length > 0 ? (
          <ViewHistoryWrapper>
            <Wrapper>
              <DataGrid
                rows={newArray}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[3, 5, 10]}
                checkboxSelection
                pageSize={pageSize}
                onPageSizeChange={(newPage) => setPageSize(newPage)}
                pagination
                handleRemove={handleRemove}
              />
            </Wrapper>
          </ViewHistoryWrapper>
        ) : (
          <ViewWithoutHistoryWrapper>
            <Wrapper>
              <p>Find your first plot</p>
            </Wrapper>
          </ViewWithoutHistoryWrapper>
        )
      }
    </>


  );
}