import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Stack, Button, Modal, Box, TextField } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
 // Import the CitationGenerator component

export const MuiNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State variable to track whether the citation generator popup is open

  const handleOpenCitationGenerator = () => {
    setIsOpen(true);
  };

  const handleCloseCitationGenerator = () => {
    setIsOpen(false);
  };

  const handleRedirectToCitationGenerator = () => {
    window.location.href = 'https://cutt.ly/ywWOP2o5';
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='small' edge='start' color='inherit' aria-label='logo'>
          <LanguageIcon />
        </IconButton>

        <Typography variant='h6'  component='div' sx={{flexGrow:1}}>
          Research
        </Typography>

        <Stack direction='row' spacing={4}>
          <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
            <StickyNote2Icon />
          </IconButton>

          <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
            <FormatQuoteIcon />
          </IconButton>

          <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={handleRedirectToCitationGenerator}>
            <ChatBubbleOutlineIcon />
          </IconButton>

          <Stack direction='row' spacing={1}>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>

      <Modal open={isOpen} onClose={handleCloseCitationGenerator}>
        <Box sx={{ padding: 20 }}>
          
        </Box>
      </Modal>
    </AppBar>
  );
};

export default MuiNavbar;

