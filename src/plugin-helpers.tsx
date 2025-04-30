import { Builder } from '@builder.io/react';
import React from 'react'
import {
  Book,
} from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import ContentTab from './components/ContentTab';


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
