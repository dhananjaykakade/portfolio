'use client'

import { useState } from 'react'
import { Check, Copy, FileCode } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
  language: string
  value: string
  filename?: string
}

export function CodeBlock({ language, value, filename }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-lg md:rounded-xl overflow-hidden border border-[#2D2D30] bg-[#1E1E1E] shadow-lg">
      <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-[#2D2D30] border-b border-[#3E3E42]">
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
          {filename && (
            <>
              <div className="flex items-center gap-1.5 md:gap-2 min-w-0 flex-1">
                <FileCode className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#FF7F3E] flex-shrink-0" />
                <span className="text-xs md:text-sm text-gray-300 font-mono truncate">{filename}</span>
              </div>
              <div className="h-4 w-px bg-[#3E3E42] flex-shrink-0" />
            </>
          )}
          <span className="text-xs md:text-sm text-[#FF7F3E] font-mono font-semibold flex-shrink-0">{language}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-[#3E3E42] transition-colors flex-shrink-0 ml-2"
        >
          {isCopied ? (
            <Check className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
          ) : (
            <Copy className="h-3 w-3 md:h-4 md:w-4 text-gray-400 hover:text-[#FF7F3E]" />
          )}
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: '#1E1E1E',
          fontSize: '0.813rem',
          lineHeight: '1.6',
          borderRadius: 0,
        }}
        wrapLongLines={true}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
}