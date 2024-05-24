"use client";

import '@mdxeditor/editor/style.css'
import { 
  MDXEditor,
  BoldItalicUnderlineToggles, 
  ListsToggle, 
  toolbarPlugin, 
  listsPlugin,
  MDXEditorMethods, 
} from "@mdxeditor/editor";
import { FC, forwardRef } from "react";

import styles from "./mdx-editor.module.css";

interface EditorProps {
  markdown: string;
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */

export const Editor = forwardRef<MDXEditorMethods, EditorProps>(({
   markdown 
  }, ref) => {
  return (
    <MDXEditor
      contentEditableClassName={styles.mdxeditor}
      ref={ref}
      markdown={markdown}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
                <BoldItalicUnderlineToggles />
                <ListsToggle />
            </>
          )
        }),
        listsPlugin(),
      ]}
    />
  );
});

Editor.displayName = "Editor";
