import { Dispatch, SetStateAction, useRef, useState } from "react"
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview } from "./canvasPreview"
import { useDebounceEffect } from "./useDebounceEffect"

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

const CropImage = ({cb}: {cb: Dispatch<SetStateAction<Blob | undefined>>}) => {
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [aspect, setAspect] = useState<number | undefined>(570 / 350)
  const [blobReady, setBlobReady] = useState(false)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        reader.result && setImgSrc(reader.result.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop
        )
      }
    },
    100,
    [completedCrop],
  )

  return (
    <>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {Boolean(imgSrc) && (
        <ReactCrop
          style={{width: 400}}
          crop={crop}
          onChange={(_, percentCrop) => {
            setCrop(percentCrop)
            setBlobReady(false)
          }}
          onComplete={(c) => {
            setCompletedCrop(c)
            previewCanvasRef.current?.toBlob(blob => {
              if (blob) {
                setBlobReady(true)
                cb(blob)
              }
            }, 'image/jpeg', 0.95)
          }}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {blobReady ? <span>Blob ready</span> : <span>Blob is not ready</span>}
      <div>
        {completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </div>
    </>
  )
}

export default CropImage