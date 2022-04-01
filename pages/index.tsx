import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Image from 'next/image'
import { getSession, useSession } from 'next-auth/react'
import Login from '../components/Login'
import Modal from '@material-tailwind/react/Modal'
import Modalbody from '@material-tailwind/react/ModalBody'
import Modalfooter from '@material-tailwind/react/ModalFooter'
import { useState } from 'react'
import { createBrotliDecompress } from 'zlib'
import { db } from '../firebase'
import firebase from 'firebase/compat/app'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import DocumentRow from '../components/DocumentRow'

export default function Home() {
  const { data: session } = useSession()

  if (!session) return <Login />

  const [showModal, setShowModal] = useState(false)
  const [input, setInput] = useState('')

  const [snapshot] = useCollectionOnce(
    db.collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .orderBy('timestamp', 'desc')
  )

  const createDocument = () => {
    if (!input) return

    db.collection('userDocs').doc(session.user.email).collection('docs').add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput('')
    setShowModal(false)
  }

  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <Modalbody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="w-full outline-none"
          placeholder="Enter name of document..."
          onKeyDown={(e) => e.key === 'Enter' && createDocument()}
        />
      </Modalbody>
      <Modalfooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={() => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>

        <Button color="blue" onClick={createDocument} ripple="light">
          Create
        </Button>
      </Modalfooter>
    </Modal>
  )

  return (
    <div>
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {modal}

      <section className="bg-[#F8F9FA] px-10 pb-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-lg text-gray-700">Start a new document</h2>
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className="relative h-52 w-40 cursor-pointer border-2 hover:border-blue-700"
            >
              <img
                loading="lazy"
                className="h-25 w-25 ml-1 mt-7 cursor-pointer  items-center rounded-full"
                src="https://th.bing.com/th/id/R.496c10bb174bb1f6cc5b007f3af911ff?rik=3sOYVVIK0ayP2w&riu=http%3a%2f%2f3.bp.blogspot.com%2f-6MQ0m0S8XPo%2fT8D2N2ip6bI%2fAAAAAAAABmY%2frQ9u177Vjk4%2fs250%2fg_plus_a-icon.png&ehk=BMjCKLCcSCF2E06bfoFpCG6oeJ65HsN4kz7RseBAi2U%3d&risl=&pid=ImgRaw&r=0"
                alt=""
              />
            </div>
            <p className="ml-2 mt-2 text-sm font-semibold text-gray-700">
              Black
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className=" mx-auto max-w-3xl  py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="flex-grow font-medium">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>

          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
