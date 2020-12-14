import { useState } from "react";
import { ButtonStyled, FormContainer } from "./styles";
import ModalHeader from "../ModalHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import Rating from "../Rating";
import TextField from "@material-ui/core/TextField";

const Edit = ({ page, id }) => {
  console.log("inicio pagina", page);
  const [value, setValue] = useState(1);

  const schema = yup.object().shape({
    title: yup.string(),
    status: yup.string(),
    rating: yup.string(),
    description: yup.string(),
    deploy_url: yup.string(),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSend = (data) => {
    console.log(data);

    const key =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDc3ODg5MzcsImV4cCI6MTYwODA0ODEzNywic3ViIjoiMDQ3ZTU3MTgtMDdhZS00NWUwLWEyNTYtMWZhOWEwMTg2OTg1In0.OzvYFEvabPb-eyFtFnCZToLcy1ZXJ6BoIdlHGTrUrxE";
    const token = localStorage.getItem("authToken");

    const infoDecide = (data) => {
      let statusType = " default";

      switch (data.status) {
        case "1":
          statusType = "Iniciante";
          break;
        case "2":
          statusType = "Intermediario";
          break;
        case "3":
          statusType = "Avançado";
          break;
        default:
          statusType = "final";
          break;
      }
      return page === "techs"
        ? { title: data.title, status: statusType }
        : data;
    };

    const addInfo = infoDecide(data);

    console.log("dado add Info", addInfo);

    try {
      axios.put(
        `https://kenziehub.me/users/${page}/cf938fd7-5642-4e68-a345-2b3e1323927c`,
        addInfo,
        {
          headers: {
            Authorization: `Bearer: ${key}`,
            "Content-type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }

    console.log(page);
  };

  return (
    <>
      <ModalHeader>
        Editar {page === "techs" ? "Tecnlogia" : "Trabalho"}{" "}
      </ModalHeader>
      <FormContainer onSubmit={handleSubmit(handleSend)}>
        {page === "techs" ? (
          <>
            <span>
              <TextField
                id="outlined-basic"
                type="text"
                variant="outlined"
                name="title"
                fullWidth
                label="Tecnologia"
                inputRef={register}
                // error={errors.title}
                // helperText={errors.title?.message}
              />
            </span>
            <TextField
              id="outlined-basic"
              name="status"
              inputRef={register}
              value={value}
              type="hidden"
              error={!!errors.status}
              helperText={errors.status?.message}
            />

            <span>
              <Rating value={value} width={100} setValue={setValue} />
            </span>
          </>
        ) : (
          <>
            <span>
              <TextField
                id="outlined-basic"
                type="text"
                variant="outlined"
                name="title"
                fullWidth
                label="Trabalho"
                inputRef={register}
                error={errors.title}
                helperText={errors.title?.message}
              />
            </span>

            <span>
              <TextField
                id="outlined-basic"
                label="Url do Projeto"
                variant="outlined"
                name="deploy_url"
                fullWidth
                inputRef={register}
                error={!!errors.url}
                helperText={errors.url?.message}
              />
            </span>
            <span>
              <TextField
                name="description"
                id="outlined-basic"
                label="Descrição"
                variant="outlined"
                fullWidth
                inputRef={register}
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </span>
          </>
        )}
        <ButtonStyled type="submit">Atualizar</ButtonStyled>
      </FormContainer>
    </>
  );
};
export default Edit;
