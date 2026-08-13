import { randomBytes } from "crypto"

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

export function generateShortCode(length = 7) {
  const bytes = randomBytes(length)

  let result = ""

  for (let i = 0; i < length; i++) {
    result += CHARACTERS[bytes[i] % CHARACTERS.length]
  }

  return result
}