import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import useSWR from "swr";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditBook() {
  const [date, setDate] = useState(Date.now());
  const router = useRouter();
  const { id } = router.query;

  const fetcher = async (url) =>
    await axios.get(url).then((res) => {
      return res.data.data;
    });

  const { data, error } = useSWR(
    `https://ozy.ilearn.mn/v1/books/${id}`,
    fetcher
  );

  function submitHandler(e) {
    e.preventDefault();
    axios
      .put(`https://ozy.ilearn.mn/v1/books/?id=${id}`, {
        book_name: e.target.book_name.value,
        price: e.target.price.value,
        author: e.target.author.value,
        ISBN: e.target.ISBN.value,
        publish_date: date,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      {data ? (
        <div>
          <Box
            component="form"
            style={{
              backgroundColor: "white",
              color: "black",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onSubmit={submitHandler}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Book
            </Typography>
            <TextField
              label="Book Name"
              defaultValue={data.book_name}
              name="book_name"
            ></TextField>
            <TextField
              label="Price"
              defaultValue={data.price}
              name="price"
            ></TextField>
            <TextField
              label="Author"
              defaultValue={data.author}
              name="author"
            ></TextField>
            <TextField
              label="ISBN"
              defaultValue={data.ISBN}
              name="ISBN"
            ></TextField>
            <DatePicker
              selected={date}
              onChange={(date) => {
                setDate(date);
              }}
              showTimeSelect
              dateFormat="Pp"
            />
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </div>
      ) : null}
    </>
  );
}

export default EditBook;
