// src/components/editor/TiptapEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { 
  FaBold, FaItalic, FaStrikethrough, FaCode, FaListUl, FaListOl, FaQuoteRight, FaUndo, FaRedo 
} from 'react-icons/fa'

// --- Toolbar Component ---
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  const btnClass = (isActive: boolean) => 
    `p-2 rounded-md text-sm font-bold transition-colors ${
      isActive 
        ? 'bg-accent text-white' 
        : 'text-gray-300 hover:bg-white/10 hover:text-white'
    }`

  return (
    <div className="flex flex-wrap gap-1 p-2 mb-2 border-b border-white/20 bg-black/20 rounded-t-lg">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="Bold"><FaBold /></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="Italic"><FaItalic /></button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={btnClass(editor.isActive('strike'))} title="Strike"><FaStrikethrough /></button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btnClass(editor.isActive('codeBlock'))} title="Code Block"><FaCode /></button>
      
      <div className="w-[1px] h-6 bg-white/20 mx-1 self-center"></div>
      
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="Bullet List"><FaListUl /></button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))} title="Ordered List"><FaListOl /></button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))} title="Quote"><FaQuoteRight /></button>
      
      <div className="w-[1px] h-6 bg-white/20 mx-1 self-center"></div>

      <button onClick={() => editor.chain().focus().undo().run()} className={btnClass(false)} title="Undo"><FaUndo /></button>
      <button onClick={() => editor.chain().focus().redo().run()} className={btnClass(false)} title="Redo"><FaRedo /></button>
    </div>
  )
}

// --- Main Editor Component ---
interface TiptapEditorProps {
  content: string
  onChange: (html: string) => void
}

export const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-2 text-white',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="w-full border border-slate-400 rounded-lg bg-black/40 overflow-hidden focus-within:border-accent transition-colors">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}