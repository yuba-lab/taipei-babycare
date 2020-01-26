const cheerio = require('cheerio')

const parseList = text => {
  const $ = cheerio.load(text)

  return $('.list-imf-box')
    .get()
    .map(element => $(element))
    .map(row => {
      const content = row
        .find('.imf-content')
        .text()
        .replace(/(在|到)宅：/g, '\n')
        .replace(/\/月/, '/月\n')
        .replace(/\/請洽詢保母/, '/請洽詢保母\n')
        .replace(/\t+/g, '\n')
        .replace(/\n+/g, '\n')
        .trim()
      const items = Object.assign({}, ...content
        .split('\n')
        .map(line => {
          const [label,, value] = line.split(/\s*(：|:)\s*/)
          return {[label]: value}
        }))

      return {
        id: items['系統編號'],
        name: row.find('.babysitter-name').text().trim(),
        location: items['托育地點'],
        babys: parseInt(items['目前已收托數']) || 0,
        beds: parseInt(items['預計總收托數']) || 0,
        phone: items['保母電話'],
        fare: items['日間托育'] || '?',
        admin: items['中心名稱'],
        certificate: `${items['登記資格']} ${items['保母証號']}`,
      }
    })
}

const parseDetail = text => {
  const $ = cheerio.load(text)
  const items = Object.assign({}, ...$('.personal-data-row > div > .row')
    .get()
    .map(element => $(element))
    .map(row => {
      const label = row.find('label').text().replace('：', '')
      const text = row
        .find('.col-sm-9')
        .text()
        .replace(/\t+/g, '\n')
        .replace(/\n+/g, '\n')
        .trim()
      return {[label]: text}
    }))

  return {
    gender: items['保母性別'],
    age: items['保母年齡'],
    religion: items['信仰宗教']
  }
}

module.exports = {parseList, parseDetail}
