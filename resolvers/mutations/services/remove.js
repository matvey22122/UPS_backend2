import { existsSync, unlinkSync } from "fs"
import path from "path"
import config from "config"

export const removeImage = async (imageUrl) => {
  const baseUrl = config.get("BASE_URL")
  const filename = imageUrl.replace(`${baseUrl}/images/`, "")
  const pathName = path.join(__dirname, `../../public/images/${filename}`)

  if (existsSync(pathName)) {
    unlinkSync(path.join(__dirname, `../../public/images/${filename}`))
  }
}
