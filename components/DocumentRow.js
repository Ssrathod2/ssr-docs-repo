import React from 'react'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { useRouter } from 'next/dist/client/router'

function DocumentRow({ id, fileName, date }) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex cursor-pointer items-center rounded-lg p-4 text-gray-700 hover:bg-gray-100"
    >
      <Icon name="article" size="3xl" color="blue" />
      <p className="w-10 flex-grow truncate pl-5 pr-10">{fileName}</p>
      <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>

      <Button
        color="transperent"
        bottonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="border-0"
      >
        <Icon name="more_vert" size="3xl" color="gray" />
      </Button>
    </div>
  )
}

export default DocumentRow
