import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function MovieCard({
  title,
  release_date,
  overview,
  posterImage,
  vote_average,
}) {
  return (
    <Box>
      <Card sx={{ minWidth: 400, height: 1000 }}>
        <CardMedia
          sx={{ height: 500 }}
          image={`https://image.tmdb.org/t/p/w500${posterImage}`}
          title={title}
        />
        <CardContent sx={{ minHeight: 200 }}>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {overview}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {release_date}, 🌟 Rating: 10/{vote_average}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Details</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default MovieCard;
