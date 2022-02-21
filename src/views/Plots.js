import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ViewHistoryWrapper, ViewWithoutHistoryWrapper } from '../components/molecules/ViewWrapper';
import { useSelector } from 'react-redux';
import { Wrapper } from '../components/Organism/Navigation.styles';

const DataTable = () => {
  const [pageSize, setPageSize] = useState(5);
  const rowss = useSelector(state => state.plots);
  const newArray = rowss.filter(obj => {
    return obj.city !== "";
  });

  const columns = [
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'city', headerName: 'City', width: 140 },
    { field: 'street', headerName: 'Street', width: 140 },
    {
      field: 'number',
      headerName: 'Number',
      type: 'number',
      width: 150,
    },
  ];

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
                onPageSizeChange={(newPage) => setPageSize(newPage)}
                pagination
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

export default DataTable;