
export const tempConversion = (temperature: number, convertTemp: boolean): string => {
  return convertTemp ? Math.round((temperature * 9 / 5) + 32) + '℉' : temperature + '℃'
}

export const handleFocus = (event) => event.target.select()
