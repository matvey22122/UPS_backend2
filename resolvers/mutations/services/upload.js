import { createWriteStream } from "fs"
import { v4 } from "uuid"
import path from "path"
import config from "config"

export const uploadImage = async (file) => {
  const { createReadStream, mimetype, filename } = await file

  if (
    mimetype === "image/png" ||
    mimetype === "image/jpg" ||
    mimetype === "image/jpeg"
  ) {
    const stream = createReadStream()
    const { ext } = path.parse(filename)
    const fname = v4() + ext
    const pathName = path.join(__dirname, `../../public/images/${fname}`)

    await stream.pipe(createWriteStream(pathName))

    const baseUrl = config.get("BASE_URL")
    return `${baseUrl}/images/${fname}`
  }
  return false
}
