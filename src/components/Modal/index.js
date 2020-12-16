import { useSelector } from "react-redux";

import { useState } from "react";
import { Backdrop, Fade } from "@material-ui/core";
import { ModalContainer, PaperContainer, ButtonContainer } from "./styles";
import ModalChangePhoto from "../ModalChangePhoto";
import Delete from "../ModalDelete";
import Add from "../ModalAdd";
import Edit from "../ModalEdit";
import { BsPlusCircleFill } from "react-icons/bs";
import ProfileUpdate from "../ProfileUpdate";
import ChangePassword from "../ChangePassword";

//HELPERS
import { verifyUser } from "../../helpers";

const TransitionsModal = ({ children, type, setAnchorEl, page, id }) => {
  const [open, setOpen] = useState(false);
  const authenticated = useSelector(({ authenticated }) => authenticated);
  const data = useSelector(({ data }) => data);

  const getUserLogged = localStorage.getItem("userLogged");
  const verifyUserLogged = data.map(
    (user) => JSON.parse(getUserLogged).id === user.id
  );
  const verified = verifyUser(authenticated, verifyUserLogged);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const elementCaller = (type) => {
    switch (type) {
      case "add":
        return (
          <ButtonContainer>
            <BsPlusCircleFill onClick={handleOpen} />
          </ButtonContainer>
        );
      case "edit":
        return (
          <ButtonContainer>
            <button className="edit" type="button" onClick={handleOpen}>
              {children}
            </button>
          </ButtonContainer>
        );
      case "delete":
        return (
          <ButtonContainer>
            <button className="delete" type="button" onClick={handleOpen}>
              {children}
            </button>
          </ButtonContainer>
        );
      case "update":
      case "changePassword":
        return (
          <label
            onClick={() => {
              handleOpen();
              setAnchorEl(null);
            }}
          >
            {children}
          </label>
        );
      case "changePhoto":
        return <div onClick={handleOpen}>{children}</div>;
      default:
        return (
          <button type="button" onClick={handleOpen}>
            {children}
          </button>
        );
    }
  };

  const componentRender = (type) => {
    switch (type) {
      case "delete":
        return <Delete id={id} page={page} close={handleClose} />;
      case "edit":
        return <Edit id={id} page={page} close={handleClose} />;
      case "add":
        return <Add page={page} close={handleClose} />;
      case "changePhoto":
        return <ModalChangePhoto setOpen={setOpen} />;
      case "update":
        return <ProfileUpdate setOpen={setOpen} />;
      default:
        return <ChangePassword setOpen={setOpen} />;
    }
  };

  return (
    <div>
      {elementCaller(type)}
      {verified && (
        <ModalContainer
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <PaperContainer>{componentRender(type)}</PaperContainer>
          </Fade>
        </ModalContainer>
      )}
    </div>
  );
};
export default TransitionsModal;
