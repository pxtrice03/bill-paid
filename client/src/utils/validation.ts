/**
 * Checks if the string contains only digits 
 */
export const isValidInteger = (value: string): boolean => {
    return /^\d*$/.test(value)
}

/**
 * Remove anythin that isn't a number
 */
export const onlyIntegers = (value: string): string => {
    return value.replace(/\D/g, '')
}
