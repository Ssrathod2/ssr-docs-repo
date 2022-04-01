import React from 'react'
import dynamic from 'next/dynamic'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
//import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js'
import { useState } from 'react'
import { db } from '../firebase'
import { useRouter } from 'next/dist/client/router'
import { convertFromRaw, convertToRaw } from 'draft-js'
import { useSession } from 'next-auth/react'
import { useDocumentOnce } from "react-firebase-hooks/firestore"
import { useEffect } from "react"

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  }
)

function TextEditor() {
  const { data: session } = useSession()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const router = useRouter()

  const { id } = router.query

  const [snapshot] = useDocumentOnce(
      db.collection('userDocs').doc(session.user.email).collection('docs').doc(id)
  )

  useEffect(()=> {
      if(snapshot?.data()?.editorState){
          setEditorState()
      }

  },[])

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)

    db.collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .doc(id)
      .set(
        {
          editorState: convertToRaw(editorState.getCurrentContent()),
        },
        {
          merge: true,
        }
      )
  }

  console.log(editorState)

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 
         !justify-center mx-auto"
        editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto
         mb-12 border"
      />
    </div>
  )
}

export default TextEditor
