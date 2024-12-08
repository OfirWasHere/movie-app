import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Modal from "./Modal";
import { useState } from "react";

function MovieCard({
  title,
  release_date,
  overview,
  posterImage,
  vote_average,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          sx={{ height: 500, objectFit: "cover" }}
          image={`https://image.tmdb.org/t/p/w500${posterImage}`}
          title={title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              height: "100px",
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 3,
            }}
          >
            {overview}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", marginTop: 1 }}
          >
            {release_date} | 🌟 {vote_average}/10
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="large"
            variant="outlined"
            fullWidth
            onClick={handleOpen}
          >
            Details
          </Button>
        </CardActions>
      </Card>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        title={title}
        release_date={release_date}
        overview={overview}
        posterImage={posterImage}
        vote_average={vote_average}
      />
    </Box>
  );
}

export default MovieCard;
