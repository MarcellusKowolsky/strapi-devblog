import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Td, Th,Link } from '@strapi/design-system';
import { Box } from '@strapi/design-system';
import { Typography, BaseCheckbox, Alert, Loader, Flex, IconButton } from '@strapi/design-system';
import { Pencil, Plus, Trash } from '@strapi/icons';
import { useFetchClient } from '@strapi/helper-plugin';

const COL_COUNT = 5;

const Repo = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const client = useFetchClient();

  useEffect(() => {
    setLoading(true);

    // Use a regular function with .then() and .catch()
    client
      .get('/github-projects/repos')
      .then((response) => setRepos(response.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));


  }, []);

  if (loading) return <Loader />;

  if (error) return <Alert type="danger">{error.message}</Alert>;

  return (
    <Box>
      <Typography variant="h4">GitHub Repos</Typography>
      <Table colCount={COL_COUNT}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>URL</Th>
            <Th>Project ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* Map over the repos array and render each repo as a table row */}
          {repos.map(({ id, name, shortDescription: description , url , projectID }) => (
            <Tr key={id}>
              {/* Use BaseCheckbox for boolean values */}
              {/* Use Typography for text values */}
              {/* Use Link for URL values */}
              {/* Use other components as needed */}
              <Td><BaseCheckbox value={name} /></Td>
              <Td><Typography>{description}</Typography></Td>
              <Td><Link href={url}>{url}</Link></Td>
              <Td>
            { projectID ?                  
                (<Flex>
                      <IconButton onClick={() => console.log('edit')} label="Edit" noBorder icon={<Pencil />} />
                      <Box paddingLeft={1}>
                        <IconButton onClick={() => console.log('delete')} label="Delete" noBorder icon={<Trash />} />
                      </Box>
                </Flex>) :
                (
                  <IconButton onClick={() => console.log('addd')} label="Add" noBorder icon={<Plus />} />
                )
              }

              </Td>


              <Td><Typography>{id}</Typography></Td>
            </Tr>
            
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Repo;