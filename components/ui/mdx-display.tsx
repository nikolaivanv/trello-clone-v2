//import { MDXRemote } from 'next-mdx-remote/rsc'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from "./mdx-display.module.css";

interface MDXDisplayProps {
    source: string;
}

export const MDXDisplay = ({
    source
}: MDXDisplayProps) => {
    console.log(source);
    return (
        <Markdown className={styles.mdxdisplay} remarkPlugins={[remarkGfm]}>{source}</Markdown>
    );
};