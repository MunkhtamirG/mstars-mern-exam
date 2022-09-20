import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Stack } from "@mui/system";

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
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  function submitHandler(e) {
    axios
      .post(`https://ozy.ilearn.mn/v1/books/`, {
        book_name: e.target.book_name.value,
        code: e.target.code.value,
        price: e.target.price.value,
        author: e.target.author.value,
        ISBN: e.target.ISBN.value,
        publisher: e.target.publisher.value,
        publish_date: value,
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
          <Typography
            id="modal-modal-title"
            component="h2"
            style={{ fontSize: "24px", fontWeight: 700, textAlign: "center" }}
          >
            Add Book
          </Typography>
          <TextField label="Name" name="book_name" required></TextField>
          <TextField label="Code" name="code" required></TextField>
          <TextField label="Price" name="price" required></TextField>
          <TextField label="Author" name="author" required></TextField>
          <TextField label="ISBN" name="ISBN" required></TextField>
          <TextField label="Publisher" name="publisher" required></TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack>
              <DateTimePicker
                label="Date&Time picker"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                components={{
                  OpenPickerIcon: DateRangeIcon,
                }}
              />
            </Stack>
          </LocalizationProvider>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
