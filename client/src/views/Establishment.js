import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import formatDistance from 'date-fns/formatDistance';
import { Container, Card, CardBody, List } from 'reactstrap';
import MaterialTable from 'material-table';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

// Icons Needed
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom';
// Core Components
import PageWrapper from 'components/PageWrapper';
import Header from 'components/Headers/SimpleHeader';
import tableIcons from 'components/TransactionListIcon';

import {
  createEstablishment,
  getEstablishments,
  editEstablishment,
  deleteEstablishment,
  establishmentList,
} from 'store/establishment';

const Establishment = () => {
  const dispatch = useDispatch();

  const establishments = useSelector(establishmentList);
  useEffect(() => dispatch(getEstablishments()), [dispatch]);

  const list = establishments?.list.map((establishment) => ({
    ...establishment,
    d: {},
  }));

  const [preferDarkMode, setPreferDarkMode] = useState(() => {
    const mode = localStorage.getItem('_tableDarkMode');
    return mode === 'true' || false;
  });

  const theme = createMuiTheme({
    palette: {
      type: preferDarkMode ? 'dark' : 'light',
    },
  });

  const columns = [
    {
      title: 'Name',
      field: 'city',
    },
    {
      title: 'Location',
      field: 'location',
    },
  ];

  const handleAdd = async (data) => dispatch(createEstablishment(data));

  const handleEdit = async (data) => dispatch(editEstablishment(data));

  const handleDelete = async (data) => dispatch(deleteEstablishment(data));

  return (
    <PageWrapper>
      <Header />
      <Container className="mt--7" fluid>
        <MuiThemeProvider theme={theme}>
          <MaterialTable
            actions={[
              (rowData) => ({
                icon: () =>
                  rowData.isOpen ? <MeetingRoomIcon /> : <NoMeetingRoomIcon />,
                tooltip: `${rowData.isOpen ? 'Close' : 'Open'} Establishment`,
                onClick: () => handleDelete(rowData),
              }),
            ]}
            columns={columns}
            data={list}
            detailPanel={[
              {
                tooltip: 'Details',
                render: (rowData) => {
                  return (
                    <Card>
                      <CardBody>
                        <p>
                          {' '}
                          Information about the <b>{rowData.city}</b>{' '}
                          establishment currrently{' '}
                          <b>{rowData.isOpen ? 'Open' : 'Close'}</b>
                        </p>
                        <List>
                          <li>
                            <b>Last {rowData.isOpen ? 'open' : 'close'}: </b>
                            {formatDistance(
                              new Date(rowData?.lastClosedOpen),
                              new Date(),
                              { addSuffix: true }
                            )}
                          </li>
                          <li>
                            <b>{rowData.isOpen ? 'Opened' : 'Closed'} by: </b>
                            {rowData.dateAdded}
                          </li>
                          <li>
                            <b>Created: </b>
                            {formatDistance(
                              new Date(rowData?.dateAdded),
                              new Date(),
                              { addSuffix: true }
                            )}
                          </li>
                          <li>
                            <b>Last edited: </b>
                            {formatDistance(
                              new Date(rowData?.dateAdded),
                              new Date(),
                              { addSuffix: true }
                            )}
                          </li>
                          <li>
                            <b>Last edited by: </b>
                            {rowData.dateAdded}
                          </li>
                        </List>
                      </CardBody>
                    </Card>
                  );
                },
              },
            ]}
            editable={{
              onRowAdd: handleAdd,
              onRowUpdate: handleEdit,
            }}
            icons={tableIcons}
            isLoading={establishments.loading}
            title="Establishments"
            options={{ actionsColumnIndex: -1 }}
          />
        </MuiThemeProvider>
      </Container>
    </PageWrapper>
  );
};

export default Establishment;
