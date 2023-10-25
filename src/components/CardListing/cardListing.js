import React from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Tooltip,
} from "@mui/material";
import "./cardList.css";
import { useSelector } from "react-redux";

const CardListing = ({
  imageSrc,
  name,
  status,
  onEditClick,
  onRemoveClick,
}) => {

  const statusColor = status === "inactive" ? "red" : "green";
  const adminLogged = useSelector((state) => state.ui.adminLogged);

  return (
    <Card draggable id={name}>
      <CardMedia component="img" height="140" image={imageSrc} alt={name} />
      <CardContent>
        <Typography variant="h5" className="card-name">
          {name?.length > 10 ? (
            <Tooltip title={name}>
              <span>{`${name.substring(0, 10)}...`}</span>
            </Tooltip>
          ) : (
            name
          )}
        </Typography>{" "}
        <Typography variant="body2" className="typo-status">
          <span style={{ color: statusColor }}>{status}</span>
        </Typography>
      </CardContent>
      {adminLogged ? (
        <CardActions className="button-div">
          <Button
            size="small"
            color="primary"
            onClick={onEditClick}
            className="btn-class"
          >
            Edit
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={onRemoveClick}
            className="btn-class"
          >
            Remove
          </Button>
        </CardActions>
      ):""}
    </Card>
  );
};

export default CardListing;
