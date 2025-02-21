import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

const MarkdownRenderer = ({ content }:{content: string}) => {
  return (
    <div className="markdown prose prose-lg prose-indigo">
      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
