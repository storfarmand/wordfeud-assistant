function makeLetterObject(letters) {
  
  let obj = {};
  for (let idx in letters) {
    if (!obj[letters[idx]]) 
      obj[letters[idx]] = 0
    obj[letters[idx]]++
  }

  return obj
}



function handleFirstIteration(letters) {

  var res = []
  for (let idx in letters) {
    if (res.indexOf(letters[idx]) < 0)
      res.push(letters[idx])
  }

  return res
}

export function countCombinations(letters) {

  const maximumOccuranceOfLetters = makeLetterObject(letters)
  var combinations = handleFirstIteration(letters)
  var previousLoopCombinations = letters;
  var newLoopCombinations = []

  for (let i = 1; i < letters.length; i++) {
    // this loop makes sure we make words of all sizes, from two to the length
    for (let j = 0; j < previousLoopCombinations.length; j++) {
      // this loop builds combinations on top of the previous loop's combinations
      var currentWord = previousLoopCombinations[j]
      var currentWordLetterCount = makeLetterObject(currentWord.split(""))
      // Counts the current word's letters - into an object
      for (let k = 0; k < letters.length; k++) {
        // this loop builds new combinations on top of the current word
        if (!currentWord.includes(letters[k]) || currentWordLetterCount[letters[k]] < maximumOccuranceOfLetters[letters[k]]) {
          if (newLoopCombinations.indexOf(currentWord + letters[k]) < 0) {
            // to make sure we dont make duplicates
            currentWordLetterCount[letters[k]] += 1
            combinations.push(currentWord + letters[k])
            newLoopCombinations.push(currentWord + letters[k])
          }
        }
      }
    }

    previousLoopCombinations = newLoopCombinations
    newLoopCombinations = []
  }

  return combinations
}
