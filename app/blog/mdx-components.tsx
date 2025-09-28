import { CodeBlock } from './code-block'
import { BlogImage } from './image-component'

export const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-4xl font-bold text-white mt-12 mb-6 leading-tight" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold text-white mt-10 mb-4 leading-tight border-b border-zinc-800 pb-2" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold text-white mt-8 mb-3 leading-tight" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-xl font-bold text-white mt-6 mb-2 leading-tight" {...props} />
  ),
  p: (props: any) => (
    <p className="text-lg text-zinc-300 leading-relaxed mb-6" {...props} />
  ),
  ul: (props: any) => (
    <ul className="text-lg text-zinc-300 leading-relaxed mb-6 space-y-2 list-disc list-inside" {...props} />
  ),
  ol: (props: any) => (
    <ol className="text-lg text-zinc-300 leading-relaxed mb-6 space-y-2 list-decimal list-inside" {...props} />
  ),
  li: (props: any) => (
    <li className="text-lg text-zinc-300 leading-relaxed" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-red-500 pl-6 py-2 my-6 bg-zinc-900/50 rounded-r-lg" {...props} />
  ),
  code: (props: any) => {
    const { children, className } = props
    const language = className?.replace('language-', '') || 'text'
    
    if (typeof children === 'string') {
      return <CodeBlock language={language} value={children.trim()} />
    }
    
    return (
      <code className="px-2 py-1 text-sm bg-zinc-800 text-red-400 rounded-md font-mono" {...props} />
    )
  },
  img: (props: any) => (
    <BlogImage src={props.src} alt={props.alt} caption={props.title} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full divide-y divide-zinc-800 border border-zinc-800 rounded-lg" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="px-6 py-3 bg-zinc-800 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-zinc-700" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300 border-b border-zinc-800" {...props} />
  ),
  a: (props: any) => (
    <a className="text-red-500 hover:text-red-400 underline transition-colors" {...props} />
  ),
  strong: (props: any) => (
    <strong className="font-bold text-white" {...props} />
  ),
  em: (props: any) => (
    <em className="italic text-zinc-200" {...props} />
  ),
}