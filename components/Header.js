import React from 'react'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { signOut, useSession } from 'next-auth/react'

function Header() {
  const { data: session } = useSession()
  return (
    <header className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-md">
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="h-20 w-20 border-0 md:inline-flex"
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Icon name="description" size="5xl" color="blue" />
      <h1 className="ml-2 text-2xl text-gray-700 md:mx-10">Docs</h1>
      <div className=" mx-5 flex flex-grow items-center rounded-lg bg-gray-100 px-5 py-2 text-gray-600 focus-within:text-gray-600 focus-within:shadow-md">
        <Icon name="search" size="3xl" color="gray" />
        <input
          type="text"
          placeholder="Search"
          className="flex-grow bg-transparent px-5 text-base outline-none"
        />
      </div>

      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="h-20 w-20 border-0 md:ml-20 "
      >
        <Icon name="apps" size="3xl" color="gray" />
      </Button>
      <img
        onClick={signOut}
        loading="lazy"
        className="ml-2 h-12 w-12 cursor-pointer rounded-full"
        src={session?.user?.image}
        alt=""
      />
    </header>
  )
}

export default Header
