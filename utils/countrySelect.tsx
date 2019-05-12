export const getStates = () => {
  return [
    { abbr: 'ch', name: 'China' },
    { abbr: 'jp', name: 'Japan' },
  ]
}

export const matchStateToTerm = (state: any, value: any) => {
  return (
    state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
}