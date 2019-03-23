const checkConfig = () => {
  const requiredKeys = ['API']

  requiredKeys.forEach(key => {
    if (Object.keys(process.env).indexOf(key) === -1) {
      throw new Error(`Required environment variable ${key} is not defined.`)
    }
  })

  return true
}

export default checkConfig
