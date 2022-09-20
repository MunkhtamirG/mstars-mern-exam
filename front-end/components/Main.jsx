import * as React from "react";
import { Paper, TableCell, Table, TableBody, TableRow } from "@mui/material";
import { Link, Button, Modal, Typography } from "@mui/material";
import { TableHead, TableContainer, Box } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useSWR from "swr";
import AddBookModal from "./AddBookModal";
import moment from "moment";

export default function Users() {
  const [open, setOpen] = React.useState(false);
  const [openAddBook, setOpenAddBook] = React.useState(false);
  const [openEditBook, setOpenEditBook] = React.useState(false);
  const handleOpenAddBook = () => setOpenAddBook(true);
  const handleCloseAddBook = () => setOpenAddBook(false);
  const booksApi = "http://localhost:4000/v1/books";
  const fetcher = async (url) =>
    await axios.get(url).then((res) => {
      return res.data.data;
    });
  const { data, error } = useSWR(booksApi, fetcher);

  function openDeleteModal() {
    setOpen(true);
  }

  function deleteHandler(e) {
    axios.delete(`http://localhost:4000/v1/books/${e}`).then((res) => {
      if (res.status === 200) {
        setOpen(false);
        location.reload();
      }
    });
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Book Name</TableCell>
            <TableCell>Book Price</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>ISBN</TableCell>
            <TableCell>Published Date</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((book, i) => {
            return (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{book._id}</TableCell>
                <TableCell>{book.book_name}</TableCell>
                <TableCell>{book.price}$</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.ISBN}</TableCell>
                <TableCell>
                  {moment(book.publish_date).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell>
                  <Link href={`/edit/${book._id}`}>
                    <EditIcon />
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      deleteHandler(book._id);
                    }}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
                <Modal
                  open={open}
                  onClose={() => {
                    setOpen(false);
                  }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      borderRadius: 5,
                      boxShadow: 24,
                      p: 4,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 3,
                      color: "black",
                    }}
                  >
                    <Typography>Delete?</Typography>
                    <div style={{ display: "flex", gap: 15 }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          deleteHandler(book._id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="success"
        style={{
          width: "100%",
        }}
        onClick={handleOpenAddBook}
      >
        Add Book
      </Button>
      <AddBookModal
        openAddBook={openAddBook}
        setOpenAddBook={setOpenAddBook}
        handleCloseAddBook={handleCloseAddBook}
      />
    </TableContainer>
  );
}
