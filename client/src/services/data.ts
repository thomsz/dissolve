import isObject from 'lodash/isObject'
import fromPairs from 'lodash/fromPairs'

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

export const flattenObject = <Type>(object: Type) => {
  const result: Record<string, unknown> = {}

  const flatten = <Type>(object: Type, prefix = '') => {
    Object.entries(object).forEach(([key, value]) => {
      if (isObject(value)) {
        flatten(value, `${prefix}${key}.`)
      } else {
        result[`${prefix}${key}`] = value
      }
    })
  }

  flatten(object)
  return result
}

export const unflattenObject = <Type>(object: Record<string, unknown>): Type => {
  const result = {} as Type

  for (const path in object) {
    const keys = path.split('.')
    keys.reduce((result, currentKey, currentIndex) => {
      const nextValue: unknown = keys[currentIndex + 1]
      const numberedItem = Number(nextValue)
      return (
        result[currentKey] ||
        (result[currentKey] = isNaN(numberedItem)
          ? (keys.length - 1 === currentIndex
            ? object[path]
            : {}
          ) : [])
      )
    }, result as any)
  }

  return result
}

export const populateDataFromSessionStorage = <Type>(initialData: Type): Type => {
  const flattenedData = flattenObject(initialData)
  const data = Object.entries(flattenedData).map(([key, value]) => {
    const sessionItem = sessionStorage.getItem(key)
    const numberedItem = Number(sessionItem)
    const isNull = sessionItem === null
    const isNumber = typeof numberedItem === 'number'
    const isEmptyString = sessionItem === ''
    const preparedValue = isNumber && !isNaN(numberedItem) && !isEmptyString && !isNull ? numberedItem : sessionItem

    try {
      const parsedValue = typeof preparedValue === 'string'
        ? JSON.parse(preparedValue)
        : preparedValue

      return [key, parsedValue ?? value]
    } catch {
      return [key, preparedValue ?? value]
    }
  })

  return unflattenObject<Type>(fromPairs(data))
}