import React from "react";
import {
  Button,
  Box,
  CardMedia,
  Typography,
  Modal as MuiModal,
} from "@mui/material";

function Modal({
  isOpen,
  handleClose,
  title,
  release_date,
  overview,
  posterImage,
  vote_average,
}) {
  return (
    <MuiModal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="movie-modal-title"
      aria-describedby="movie-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: 300, borderRadius: 2 }}
          image={`https://image.tmdb.org/t/p/w500${posterImage}`}
          alt={title}
        />
        <Typography
          id="movie-modal-title"
          variant="h4"
          component="h2"
          sx={{ mt: 2 }}
        >
          {title}
        </Typography>
        <Typography
          id="movie-modal-description"
          variant="body1"
          sx={{ mt: 2, color: "text.secondary" }}
        >
          {overview}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          Release Date: {release_date}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          🌟 Rating: {vote_average}/10
        </Typography>
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            onClick={() => console.log("Playing movie...")}
          >
            ▶ Play
          </Button>
          <Button variant="outlined" onClick={handleClose} sx={{ ml: 2 }}>
            Close
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
}

export default Modal;
