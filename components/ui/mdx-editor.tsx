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
import { FC } from "react";

import styles from "./mdx-editor.module.css";

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods>;
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */

export const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
  return (
    <MDXEditor
      className={styles.mdxeditor}
      //onChange={(e) => console.log(e)}
      ref={editorRef}
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
};
