const array = [1, 2, 2, 3, 4, 5, 6, 6, 6]

const arrayWithNoRep = new Set(array)

console.log([...arrayWithNoRep])