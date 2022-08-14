const appendToFormData = (formData: FormData, key: any, value: any) => {
  const isArray = Array.isArray(value)
  const isObject = typeof value === 'object'
  
  if (value instanceof File) {
    formData.append(key, value)
  } else if (isObject) {
    for (const subKey in value) {
      appendToFormData(formData, `${key}[${subKey}]`, value[subKey])
    }
  } else if (isArray) {
    value.forEach((item, index) => {
      appendToFormData(formData, `${key}[${index}]`, item)
    })
  } else {
    formData.append(key, value)
  }

  return formData
}

export const getFormData = (payload: object) => {
  return (Object.keys(payload) as Array<keyof typeof payload>)
    .reduce((formData, key) => appendToFormData(formData, key, payload[key]), new FormData())
}