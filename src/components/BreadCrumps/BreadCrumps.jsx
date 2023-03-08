import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useAPI } from "../../Context/APIContext";


export default function IconBreadcrumbs() {
  let navigate = useNavigate();
  const { NavBarUser } = useAPI();
  function handleClick(path) {

    navigate(path);
  }

  const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
    :hover {
      cursor: pointer;
      border-bottom: 1px solid black;
    }
`;



  return (
    <div role="presentation">
      <Breadcrumbs separator="›" aria-label="breadcrumb">

        <CustomLink
          onClick={() => handleClick('/dashboard')}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </CustomLink>

        <CustomLink
          onClick={() => handleClick('/landing')}
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          User
        </CustomLink>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {NavBarUser}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}