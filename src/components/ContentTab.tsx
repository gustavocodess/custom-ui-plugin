import React, { useState } from 'react';
import { Container, styled, Card, CardContent, Button } from '@mui/material';
import { Typography } from '@material-ui/core';
import appState from '@builder.io/app-context';
import { Save, Shuffle } from '@material-ui/icons';
import { saveBlocks } from '../utils/service';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const Title = styled(Typography)(({ theme }) => ({
  // marginBottom: 24,
  color: 'black',
}));

const StyledCard = styled(Card)(({ theme }) =>({
  // height: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const ContentTab = () => {
  const editingContent = appState?.designerState?.editingContentModel
  const [blocksList, setBlocksList] = useState(editingContent?.data?.toJSON()?.blocks)
  const [hasSort, setHasSort] = useState(false)
  const [sorts, setSorts] = useState(0)
  
  const blocksTitle = blocksList?.length ? `Blocks List (${blocksList.length})`: 'No blocks on screen'
  console.log("editingContent ", editingContent)
  console.log("elementsOnScreen ", blocksList)

  const handleSortBlocks = () => {
    const newArray = [...shuffleArray(blocksList)]
    setBlocksList(newArray)
    setHasSort(true)
    // set sorts counter to the Builder app state
    appState.designerState.editingContentModel.data.set('state', { sortsNumber: sorts + 1 });
    setSorts(sorts + 1)
  }

  const handleSave = async () => {
    await appState.globalState.showGlobalBlockingLoading(`Saving to Builder.io API's...`);
    const result = await saveBlocks("page", editingContent?.id, blocksList)
    await appState.globalState.hideGlobalBlockingLoading();
    if (result.success) {
      appState?.snackBar.show(`Suceessfully updated blocks order.`);
    } else {
      appState?.snackBar.show(`There was an error updating blocks.`);
    }
  }

  const renderActionButtons = () => {
    if (blocksList?.length) {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              endIcon={<Shuffle />}
              onClick={() => handleSortBlocks()}
            >Sort</Button>
            <div style={{ width: 16 }} />
            <Button
              variant='contained'
              color='primary'
              fullWidth
              endIcon={<Save />}
              onClick={() => handleSave()}
            >Save</Button>
          </div>
      )
    }
    return null
  }

  return (
    <StyledContainer>
      <Typography>
        {blocksTitle} {hasSort ? ' - (Sorted)' : ''}
      </Typography>
      {
        blocksList?.map((block: any) => (
          <StyledCard elevation={2} key={block?.id}>
            <StyledCardContent>
              <Title variant="h5" component="h2">
                {block?.component?.name}
              </Title>
            </StyledCardContent>
          </StyledCard>
        ))
      }
      {renderActionButtons()}
    </StyledContainer>
  );
}

export default ContentTab;