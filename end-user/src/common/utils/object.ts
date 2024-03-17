export const toFormData = (data: Record<string, any>) => {
  const formData = new FormData()

  for (let key in data) {
    if (Array.isArray(data[key])) {
      const arr = data[key]?.filter((item: any) => item !== undefined)
      for (let element of arr) {
        formData.append(key, element)
      }
    } else {
      formData.append(key, data[key])
    }
  }

  return formData
}
