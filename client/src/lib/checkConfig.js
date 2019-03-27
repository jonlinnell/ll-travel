const checkConfig = () => {
  const requiredKeys = ['API']

  requiredKeys.forEach(option => {
    if (!Object.keys(process.env).includes(option)) {
      throw new Error(`[frontend] Required environment variable ${option} is not defined in client/.env .`)
    }
  })

  return true
}

export default checkConfig
