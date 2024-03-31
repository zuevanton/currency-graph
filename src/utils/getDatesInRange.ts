export function getDatesInRange(startDateStr: string, endDateStr: string) {
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)

  const datesArray: string[] = []

  if (startDate >= endDate) {
    return datesArray
  }

  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    datesArray.push(currentDate.toISOString().split("T")[0])
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return datesArray
}
