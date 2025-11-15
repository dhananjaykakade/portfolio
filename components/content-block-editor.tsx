"use client"

import { useState, useRef, useEffect } from 'react'
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Type, 
  Image as ImageIcon, 
  Code, 
  Quote, 
  List,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from '@/components/ui/card'
import { ContentBlock } from '@/lib/blog-data'

interface ContentBlockEditorProps {
  blocks: ContentBlock[]
  onChange: (blocks: ContentBlock[]) => void
}

export function ContentBlockEditor({ blocks, onChange }: ContentBlockEditorProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])
  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      order: blocks.length,
      ...(type === 'paragraph' && { content: '' }),
      ...(type === 'heading' && { level: 2 as const, content: '' }),
      ...(type === 'image' && { url: '', alt: '', caption: '' }),
      ...(type === 'code' && { language: 'javascript', code: '', filename: '' }),
      ...(type === 'quote' && { content: '', author: '' }),
      ...(type === 'list' && { ordered: false, items: [''] }),
    } as ContentBlock

    onChange([...blocks, newBlock])
    setMenuOpen(false)
  }

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    onChange(
      blocks.map(block =>
        block.id === id ? { ...block, ...updates } as ContentBlock : block
      )
    )
  }

  const deleteBlock = (id: string) => {
    onChange(blocks.filter(block => block.id !== id))
  }

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === blocks.length - 1)
    ) {
      return
    }

    const newBlocks = [...blocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    ;[newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]
    
    // Update order values
    newBlocks.forEach((block, idx) => {
      block.order = idx
    })

    onChange(newBlocks)
  }

  const renderBlockEditor = (block: ContentBlock, index: number) => {
    return (
      <Card key={block.id} className="border-[#FF7F3E]/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            {/* Drag Handle and Move Buttons */}
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveBlock(index, 'up')}
                disabled={index === 0}
                className="h-8 w-8 p-0"
              >
                ↑
              </Button>
              <GripVertical className="h-6 w-6 text-[#4B5563] cursor-grab" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveBlock(index, 'down')}
                disabled={index === blocks.length - 1}
                className="h-8 w-8 p-0"
              >
                ↓
              </Button>
            </div>

            {/* Block Content */}
            <div className="flex-1 space-y-4">
              {block.type === 'paragraph' && (
                <div>
                  <Label>Paragraph Content</Label>
                  <Textarea
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                    placeholder="Enter paragraph text..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
              )}

              {block.type === 'heading' && (
                <div className="space-y-2">
                  <Label>Heading Level</Label>
                  <Select
                    value={block.level.toString()}
                    onValueChange={(value) => 
                      updateBlock(block.id, { level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6 })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">H1 - Main Title</SelectItem>
                      <SelectItem value="2">H2 - Section</SelectItem>
                      <SelectItem value="3">H3 - Subsection</SelectItem>
                      <SelectItem value="4">H4</SelectItem>
                      <SelectItem value="5">H5</SelectItem>
                      <SelectItem value="6">H6</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label>Heading Text</Label>
                  <Input
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                    placeholder="Enter heading text..."
                    className="mt-1"
                  />
                </div>
              )}

              {block.type === 'image' && (
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={block.url}
                    onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                  <Label>Alt Text</Label>
                  <Input
                    value={block.alt}
                    onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
                    placeholder="Image description"
                  />
                  <Label>Caption (Optional)</Label>
                  <Input
                    value={block.caption || ''}
                    onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                    placeholder="Image caption"
                  />
                  {block.url && (
                    <div className="mt-2">
                      <img 
                        src={block.url} 
                        alt={block.alt} 
                        className="max-w-full h-auto rounded-lg border border-[#FF7F3E]/20"
                      />
                    </div>
                  )}
                </div>
              )}

              {block.type === 'code' && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Language</Label>
                      <Select
                        value={block.language}
                        onValueChange={(value) => updateBlock(block.id, { language: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="css">CSS</SelectItem>
                          <SelectItem value="bash">Bash</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="sql">SQL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Filename (Optional)</Label>
                      <Input
                        value={block.filename || ''}
                        onChange={(e) => updateBlock(block.id, { filename: e.target.value })}
                        placeholder="app.js"
                      />
                    </div>
                  </div>
                  <Label>Code</Label>
                  <Textarea
                    value={block.code}
                    onChange={(e) => updateBlock(block.id, { code: e.target.value })}
                    placeholder="Enter your code here..."
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>
              )}

              {block.type === 'quote' && (
                <div className="space-y-2">
                  <Label>Quote Text</Label>
                  <Textarea
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                    placeholder="Enter quote text..."
                    rows={3}
                  />
                  <Label>Author (Optional)</Label>
                  <Input
                    value={block.author || ''}
                    onChange={(e) => updateBlock(block.id, { author: e.target.value })}
                    placeholder="Quote author"
                  />
                </div>
              )}

              {block.type === 'list' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>List Type</Label>
                    <Select
                      value={block.ordered ? 'ordered' : 'unordered'}
                      onValueChange={(value) => 
                        updateBlock(block.id, { ordered: value === 'ordered' })
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unordered">Bullet List</SelectItem>
                        <SelectItem value="ordered">Numbered List</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Label>List Items</Label>
                  {block.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => {
                          const newItems = [...block.items]
                          newItems[itemIndex] = e.target.value
                          updateBlock(block.id, { items: newItems })
                        }}
                        placeholder={`Item ${itemIndex + 1}`}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newItems = block.items.filter((_, i) => i !== itemIndex)
                          updateBlock(block.id, { items: newItems })
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateBlock(block.id, { items: [...block.items, ''] })
                    }}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>
              )}
            </div>

            {/* Delete Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteBlock(block.id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4 relative">
        <Label className="text-lg font-semibold">Content Blocks</Label>
        <div className="relative">
          <Button 
            ref={buttonRef}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-gradient-to-r from-[#FF7F3E] to-[#FF9F5A] hover:from-[#FF9F5A] hover:to-[#FF7F3E] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Block
          </Button>
          
          {menuOpen && (
            <div 
              ref={menuRef}
              className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#FF7F3E]/20 rounded-lg shadow-lg overflow-hidden z-[9999]"
            >
              <button
                type="button"
                onClick={() => addBlock('paragraph')}
                className="w-full flex items-center px-4 py-2 text-left text-[#1F2937] hover:bg-[#FFF5F0] transition-colors"
              >
                <Type className="h-4 w-4 mr-2 text-[#FF7F3E]" />
                <span>Paragraph</span>
              </button>
              <button
                type="button"
                onClick={() => addBlock('heading')}
                className="w-full flex items-center px-4 py-2 text-left text-[#1F2937] hover:bg-[#FFF5F0] transition-colors"
              >
                <Heading2 className="h-4 w-4 mr-2 text-[#FF7F3E]" />
                <span>Heading</span>
              </button>
              <button
                type="button"
                onClick={() => addBlock('image')}
                className="w-full flex items-center px-4 py-2 text-left text-[#1F2937] hover:bg-[#FFF5F0] transition-colors"
              >
                <ImageIcon className="h-4 w-4 mr-2 text-[#FF7F3E]" />
                <span>Image</span>
              </button>
              <button
                type="button"
                onClick={() => addBlock('code')}
                className="w-full flex items-center px-4 py-2 text-left text-[#1F2937] hover:bg-[#FFF5F0] transition-colors"
              >
                <Code className="h-4 w-4 mr-2 text-[#FF7F3E]" />
                <span>Code Snippet</span>
              </button>
              <button
                type="button"
                onClick={() => addBlock('quote')}
                className="w-full flex items-center px-4 py-2 text-left text-[#1F2937] hover:bg-[#FFF5F0] transition-colors"
              >
                <Quote className="h-4 w-4 mr-2 text-[#FF7F3E]" />
                <span>Quote</span>
              </button>
              <button
                type="button"
                onClick={() => addBlock('list')}
                className="w-full flex items-center px-4 py-2 text-left text-[#1F2937] hover:bg-[#FFF5F0] transition-colors"
              >
                <List className="h-4 w-4 mr-2 text-[#FF7F3E]" />
                <span>List</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {blocks.length === 0 ? (
        <Card className="border-[#FF7F3E]/20 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-[#4B5563] text-center">
              <p className="mb-4">No content blocks yet</p>
              <p className="text-sm">Click "Add Block" to start building your blog post</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => renderBlockEditor(block, index))}
        </div>
      )}
    </div>
  )
}
