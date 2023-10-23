import React from 'react';
import { TextField, IconButton, Radio, Button, Modal ,CardActions,Card,CardContent,Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import QuillbotLogo from './logo.png';
import axios from 'axios';
import academicContent from './academic.json';
import nonAcademicContent from './non-academic.json';

interface SearchResult {
  id: number;
  link: string;
  title: string;
}

export const SearchBar = ({ onSearch }: { onSearch: (query: string, isAcademicSearchEnabled: boolean) => void }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isAcademicSearchEnabled, setIsAcademicSearchEnabled] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('');

  const handleSearch = async () => {
    // Get the search results based on the academic search enabled flag.
    const searchResults = isAcademicSearchEnabled ? academicContent : nonAcademicContent;

    // Filter the search results based on the search query.
    const filteredSearchResults: SearchResult[] = searchResults.filter((result) => result.title.includes(searchQuery));

    // Update the search results state variable with the filtered search results.
    setSearchResults(filteredSearchResults);
  };

  const toggleAcademicSearchEnabled = () => {
    setIsAcademicSearchEnabled(!isAcademicSearchEnabled);
  };

  const openLink = (link: string) => {
    // Prevent the link from opening in a new tab.
    window.open(link, '_self');
  };

  const getContent = async (link: string) => {
    // Get the content of the website at the link.
    const response = await axios.get(link);
    const content = response.data;

    // Set the modal content state variable with the content of the website.
    setModalContent(content.summary);

    // Open the modal.
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="search-bar-container">
      <h2 className="search-heading">
        <img src={QuillbotLogo} alt="QuillBot Logo" className="quillbot-logo" />
      </h2>
      <div className="search-bar">
        <TextField
          id="search-bar"
          label="QuillBot Search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="search-input"
          style={{ width: '110%' }}
          InputProps={{
            startAdornment: (
              <IconButton className="search-icon" title="Search the web">
                <SearchIcon />
              </IconButton>
            ),
            endAdornment: (
              <Radio
                name="academic-search"
                checked={isAcademicSearchEnabled}
                onClick={toggleAcademicSearchEnabled}
                style={{ border: 'none', margin: '0 10px' }}
              />
            ),
          }}
        />
      </div>
      <div className="search-button">
        <Button onClick={handleSearch} style={{ color: 'inherit' }}>
          Search The Web
        </Button>
      </div>
      
      <Paper sx={{
          overflowY: 'auto', height: '400px'
      }}>
        <ul className="search-results">
          {searchResults.map((result) => (
            <Card key={result.id} style={{ margin: '10px' }}>
              <CardContent>
                <a href={result.link}>{result.title}</a>
              </CardContent>
              <CardActions>
                <Button onClick={() => openLink(result.link)}>Open Link</Button>
                <Button onClick={() => getContent(result.link)}>Get Content</Button>
                <Button>Bookmark</Button>
              </CardActions>
            </Card>
          ))}
        </ul>
      </Paper>

      <Modal open={modalIsOpen} onClose={handleCloseModal}>
        <div className="modal-content">
          <h2>{modalContent}</h2>
          <Button onClick={handleCloseModal}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

SearchBar.defaultProps = {
  onSearch: () => {}
}