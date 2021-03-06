import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Breadcrumbs,
} from "@material-ui/core";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../components/_dashboard/user";
//
import USERLIST from "../_mocks_/user";
import AddEmployee from "../components/Trip/AddTrip";
import UpdateEmployee from "../components/Trip/updateTrip";
import { getAllVehicles } from "../api/index";
import { getTrip, deleteTrip } from "../api/index";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "ID" },
  { id: "from", label: "From", alignRight: false },
  { id: "to", label: "To", alignRight: false },
  { id: "vehicle", label: "Vehicle", alignRight: false },
  { id: "branch", label: "Branch", alignRight: false },
  { id: "gunman_1", label: "Gunman 1", alignRight: false },
  { id: "gunman_2", label: "Gunman 2", alignRight: false },
  { id: "gunman_3", label: "Gunman 3", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isAddEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const [isUpdateEmployeeOpen, setUpdateEmployeeOpen] = useState(false);
  const [trips, setTrips] = useState([]);
  const [tripInfo, setTripInfo] = useState({});

  // const handleClose

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;
  const openUpdateTripDrawer = (row) => {
    setTripInfo(row);
    setUpdateEmployeeOpen(true);
  };
  const handleDeleteTrip = async (region) => {
    try {
      const data = await deleteTrip(region?.id);
      console.log(data);
      if (data.status === 204) {
        toast("Trip Deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        getData();
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const getData = async () => {
    try {
      const data = await getTrip();
      console.log(data);
      if (data.status === 200) {
        setTrips(data?.data?.results);
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Page title="Regions">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <RouterLink color="inherit" to="/" onClick={handleClick}>
              Dashboard
            </RouterLink>
            <Typography color="textPrimary">Trips</Typography>
          </Breadcrumbs>
          <Button
            variant="contained"
            onClick={() => {
              setAddEmployeeOpen(true);
            }}
            startIcon={<Icon icon={plusFill} />}
          >
            New Trip
          </Button>
        </Stack>
        <AddEmployee
          isOpenFilter={isAddEmployeeOpen}
          onOpenFilter={() => {
            setAddEmployeeOpen(true);
          }}
          onCloseFilter={async() => {
            setAddEmployeeOpen(false);
            await getData();
          }}
          tripInfo={{}}
        />
        <UpdateEmployee
          isOpenFilter={isUpdateEmployeeOpen}
          onOpenFilter={() => {
            setUpdateEmployeeOpen(true);
          }}
          onCloseFilter={async () => {
            setUpdateEmployeeOpen(false);
            await getData();
          }}
          tripInfo={tripInfo}
        />
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {trips.map((row) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>{row.start_location}</TableCell>
                      <TableCell>{row.end_location}</TableCell>
                      <TableCell>{row.vehicle?.number_plate}</TableCell>
                      <TableCell>{row.branch?.name}</TableCell>
                      <TableCell>
                        {`${row.custodian_1?row.custodian_1.first_name+" "+row.custodian_1.last_name:'None'} `}
                      </TableCell>
                      <TableCell>
					  {`${row.custodian_2?row.custodian_2.first_name+" "+row.custodian_2.last_name:'None'} `}
                      </TableCell>
                      <TableCell>{`${row.custodian_3?row.custodian_3.first_name+" "+row.custodian_3.last_name:'None'} `}</TableCell>

                      <TableCell align="right">
                        <UserMoreMenu
                          handleEdit={() => {
                            openUpdateTripDrawer(row);
                          }}
                          handleDelete={() => {
                            handleDeleteTrip(row);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}