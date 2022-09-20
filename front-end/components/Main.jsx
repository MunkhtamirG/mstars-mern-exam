import * as React from "react";
import { Paper, TableCell, Table, TableBody, TableRow } from "@mui/material";
import { Button, Modal, Typography } from "@mui/material";
import { TableHead, TableContainer, Box } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useSWR from "swr";
import AddBookModal from "./AddBookModal";
import EditBookModal from "./EditBookModal";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";
import { Container } from "@mui/system";

export default function Users() {
  const [openDelteModal, setOpenDelteModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();
  const [id, setId] = React.useState(false);
  const [openAddBook, setOpenAddBook] = React.useState(false);
  const [openEditBook, setOpenEditBook] = React.useState(false);
  const handleOpenAddBook = () => setOpenAddBook(true);
  const handleCloseAddBook = () => setOpenAddBook(false);
  const handleOpenEditBook = (i) => {
    setOpenEditBook(true);
    setId(i);
  };
  const handleCloseEditBook = () => setOpenEditBook(false);
  const booksApi = "https://ozy.ilearn.mn/v1/books";
  const fetcher = async (url) =>
    await axios.get(url).then((res) => {
      return res.data.data;
    });
  const { data, error } = useSWR(booksApi, fetcher);

  function deleteHandler(e) {
    axios.delete(`https://ozy.ilearn.mn/v1/books/${deleteId}`).then((res) => {
      if (res.status === 200) {
        setOpenDelteModal(false);
        location.reload();
      }
    });
  }
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Publisher</TableCell>
                <TableCell>Published on</TableCell>
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
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{book.book_name}</TableCell>
                    <TableCell>{book.code}</TableCell>
                    <TableCell>${book.price}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.ISBN}</TableCell>
                    <TableCell>{book.publisher}</TableCell>
                    <TableCell>
                      {moment(book.publish_date).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleOpenEditBook(i);
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <EditBookModal
                        openEditBook={openEditBook}
                        setOpenEditBook={setOpenEditBook}
                        handleCloseEditBook={handleCloseEditBook}
                        book={data[id]}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setOpenDelteModal(true);
                          setDeleteId(book._id);
                        }}
                      >
                        <DeleteForeverIcon />
                      </Button>
                    </TableCell>
                    <Modal
                      open={openDelteModal}
                      onClose={() => {
                        setOpenDelteModal(false);
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
        </TableContainer>
        <Button variant="contained" color="primary" onClick={handleOpenAddBook}>
          <AddIcon /> Add Book
        </Button>
        <AddBookModal
          openAddBook={openAddBook}
          setOpenAddBook={setOpenAddBook}
          handleCloseAddBook={handleCloseAddBook}
        />
      </div>
    </Container>
  );
}
