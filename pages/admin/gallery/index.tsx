import { useState } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import TextInput from '../../../components/Input/TextInput'
import { addDocument, deleteGalleryDoc, GalleryDocType, getGalleryDocs } from '../../../firebase/useGallery'
import CropImage from '../../../components/CropImage'
import { getShimmerBase64 } from '../../../lib/getShimmer'

const AdminGallery = ({data}: { data: Array<GalleryDocType>}) => {
  const [loading, setLoading] = useState(false)
  const [blob, setBlob] = useState<Blob>()
  const [docAddedSuccess, setDocAddedSuccess] = useState('')
  const [docAddedError, setDocAddedError] = useState('')

  return (
    <main style={{
      padding: '4rem 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 40
    }}>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 400
      }} onSubmit={async (evt) => {
        evt.preventDefault()
        
        if (blob) {
          const title = evt.currentTarget.qtitle.value
        
          setLoading(true)
          const { resultId, error } = await addDocument(blob, title)
          setLoading(false)

          if (resultId) setDocAddedSuccess(resultId)
          else if (error) setDocAddedError(error)
        } else setDocAddedError('Blob is undefined') 
      }}>
        <b>Add gallery item</b>
        <TextInput name="qtitle" typeInput='text' required max={18} min={1} />
        <CropImage cb={setBlob} />
        <button style={{
          padding: 12,
          borderRadius: 5,
          cursor: 'pointer',
          maxWidth: 100
        }}>Submit</button>

        {loading === true && <span>Uploading...</span>}

        {docAddedSuccess && <h1 style={{color: 'green'}}>Success with new ID: {docAddedSuccess}</h1>}
        {docAddedError && <h1 style={{color: 'red'}}>Error happend: {docAddedError}</h1>}
      </form>
      <div>
        <b>Delete Item</b>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16
        }}>
          {data.map((el, index) => {
            return (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}>
                <Image
                  width={150}
                  height={150}
                  objectFit="cover"
                  src={el.imgSrc}
                  alt={el.title}
                  placeholder="blur"
                  blurDataURL={getShimmerBase64(150, 150)}
                />
                <span>{el.title}</span>
                <span>{el.docId}</span>
                <button type="button" style={{
                  padding: 12,
                  borderRadius: 5,
                  cursor: 'pointer',
                  maxWidth: 100,
                  backgroundColor: 'red'
                }} onClick={() => {
                  deleteGalleryDoc(el.docId, el.storageRefName)
                }}>Delete</button>
              </div>
            )
          })}
          
        </div>
      </div>
    </main>
  )
}

export default AdminGallery

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await getGalleryDocs()

  return {
    props: {
      data: data
    }
  }
}