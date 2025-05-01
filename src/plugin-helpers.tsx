import { Builder } from '@builder.io/react';
import React from 'react'
import {
  Book,
} from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import ContentTab from './components/ContentTab';
import { Button } from '@mui/material';


export function registerEditorOnLoad(reactionCallback: (actions: ContentEditorActions) => void) {
  Builder.register('editor.onLoad', reactionCallback);
}

interface ContentEditorActions {
  updatePreviewUrl: (url: string) => void;
  safeReaction<T>(
      watchFunction: () => T,
      reactionFunction: (arg: T) => void,
      options?: {
        fireImmediately: true;
      }
  ): void;
}


export function registerContentTab() {
  // avoid registering same tab multiple times
  if (!Builder.registry["editor.editTab"]) {
    Builder.register('editor.editTab', {
      name: (
          <Tooltip title="Content Demo">
            <Book style={{ fontSize: 20, marginRight: 6 }} />
          </Tooltip>
      ),
      component: () => ContentTab(),
    })
  }
}

export function registerToolbarButton() {
  // avoid registering same menu button multiple times
  if (!Builder.registry["editor.toolbarButton"]) {
    Builder.register('editor.toolbarButton', {
      component: () => <Button variant="contained" onClick={() => alert("New item clicked!")}>
        New Button</Button>,
    });
  }
}

export function registerMainTab() {
  // avoid registering same main tab multiple times
  if (!Builder.registry["editor.mainTab"]) {
    Builder.register('editor.mainTab', {
      name: 'Custom New Tab',
      component: () => <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        height: 'inherit',
        color: 'black',
        }}>
        <h1>Hello new tab!</h1>
      </div>,
    });
  }
}

export function registerLayersContextMenu() {
  // avoid registering same menu action multiple times
  if (!Builder.registry["contextMenu.action"]) {
    Builder.register('contextMenu.action', {
      label: 'Show Selected Layers',
      showIf(selectedElements: any[]) {
        if (selectedElements?.length < 1) {
          // no elements selected
          return false;
        }
        return true;
      },
      onClick(selectedElements: any[]) {
        alert('Selected elements... \n' + JSON.stringify(selectedElements))
      },
    });
  }
}