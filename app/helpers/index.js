const normalizeSeconds = (seconds) => {
  if (seconds.toString().length === 1) {
    return `0${seconds}`
  }

  return seconds.toString()
}

export const formatSeconds = (raw) => {
  const minutes = Math.floor(raw / 60)
  const seconds = raw - (minutes * 60)

  return `${minutes}:${normalizeSeconds(seconds)}`
}

