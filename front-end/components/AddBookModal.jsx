import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "black",
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function AddBookModal({ openAddBook, handleCloseAddBook }) {
  const [date, setDate] = useState();
  function submitHandler(e) {
    axios
      .post(`http://localhost:4000/v1/books/`, {
        book_name: e.target.book_name.value,
        price: e.target.price.value,
        author: e.target.author.value,
        ISBN: e.target.ISBN.value,
        publish_date: date,
      })
      .then((res) => {
        console.log(res);
      });
  }
  return (
    <div>
      <Modal
        open={openAddBook}
        onClose={handleCloseAddBook}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={submitHandler}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Book
          </Typography>
          <TextField label="Book Name" name="book_name" required></TextField>
          <TextField label="Price" name="price" required></TextField>
          <TextField label="Author" name="author" required></TextField>
          <TextField
            label="Phone Number"
            name="phone"
            required
            type="number"
          ></TextField>
          <TextField label="Address" name="address" required></TextField>

          <TextField label="Status" name="user_status" required></TextField>
          <TextField
            label="Password"
            name="password"
            required
            type="password"
          ></TextField>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
