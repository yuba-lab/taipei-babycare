const fetch = require('node-fetch')

const listUrl = 'https://findchildcare.taipei/baby_sitter/search?members_service_zip=&search_keyword=&location_distance=-1&search_location=&search_service_type=1&take_care_cat=-1&take_care_type=-1&photo_option=-1&is_cooperation=-1'
const detailUrl = 'https://findchildcare.taipei/baby_sitter/info/14070'

const fetchList = ({ page = 1 }) => {
  const url = new URL(
    'https://findchildcare.taipei/baby_sitter/search' +
    '?members_service_zip=&search_keyword=&location_distance=-1'+
    '&search_location=&search_service_type=1&take_care_cat=-1' +
    '&take_care_type=-1&photo_option=-1&is_cooperation=-1'
  )
  return fetch(url).then(it => it.text())
}

const fetchDetail = id => {
  const url = `https://findchildcare.taipei/baby_sitter/info/${id}`
  return fetch(url).then(it => it.text())
}

const main = () => {
  fetchList({}).then(content => {
    const {parseList, parseDetail} = require('./parse')
    console.log(parseList(content))
  })
}

main()
