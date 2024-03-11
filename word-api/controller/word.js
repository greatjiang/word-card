const { exec } = require('../db/mysql')

const getWord = async () => {
  let sql = `select * from words`

  const list = await exec(sql)
  return {
    list,
  }
}

const addWord = (wordInfo = {}) => {
  // console.log(wordInfo)
  const word = wordInfo.word
  const phonetic = wordInfo.phonetic
  const meaning = wordInfo.meaning

  const sql = `insert into words (word,phonetic,meaning)
  values ('${word}','${phonetic}','${meaning}')
  `

  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  }).catch((error) => {
    console.log(error)
  })

}
module.exports = {
  getWord,
  addWord
}