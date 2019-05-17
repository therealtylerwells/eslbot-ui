export const getStates = () => {
  return [
    { abbr: 'ch', name: 'China' },
    { abbr: 'jp', name: 'Japan' },
    { abbr: 'sk', name: 'South Korea' },
    { abbr: 'th', name: 'Thailand' },
    { abbr: 'vn', name: 'Vietnam' },
    { abbr: 'cm', name: 'Cambodia' },
    { abbr: 'my', name: 'Malaysia' },
    { abbr: 'ph', name: 'Philippines' },
    { abbr: 'eu', name: 'Europe' },
    { abbr: 'na', name: 'North America' },
  ]
}

export const matchStateToTerm = (state: any, value: any) => {
  return (
    state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
}