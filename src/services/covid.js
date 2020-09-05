let responseHeaders = null
let responseStatus = null
let responseOk = null

const getFetch = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => {
      responseHeaders = res.headers
      responseStatus = res.status
      responseOk = res.ok
      return res.json()
    }).then(res => {
      const response = {
        headers: responseHeaders,
        status: responseStatus,
        ok: responseOk,
        body: res,
      }

      resolve(response)
    }).catch(err=>{
      console.log(err)
      reject(err)
    })
  })
}

const fetchTotalCount = () => {
  const url = "https://raw.githack.com/skhatri/covid-19-json-api-data/master/data/latest_counters.json"

  return getFetch(url)
    .then(response => {
      return response.body.counts
    })
}

const fetchCountryData = () => {
  const url = "https://raw.githack.com/skhatri/covid-19-json-api-data/master/data/latest_counters.json"

  return getFetch(url)
    .then(response => {
      return response.body.items.reduce((accumulator, item) => {
        if (item.country) {
          accumulator.push({
            country: item.country_region,
            recovered: item.timeline.counts.recovered,
            confirmed: item.timeline.counts.confirmed,
            deaths: item.timeline.counts.deaths,
          })
        }
        return accumulator
      }, [])
    })
}

const fetchDateFilteredData = (date) => {
  const url = `https://raw.githack.com/skhatri/covid-19-json-api-data/master/data/by-date/${date}.json`

  return getFetch(url)
    .then(response => {
      debugger
      return response.body.items.reduce((accumulator, item) => {
        if (item.country) {
          const counts = Object.values(item.timeline)[0]
          accumulator.push({
            country: item.country_region,
            recovered: counts.recovered,
            confirmed: counts.confirmed,
            deaths: counts.deaths,
          })
        }
        return accumulator
      }, [])
    })
}

export default {
  fetchTotalCount,
  fetchCountryData,
  fetchDateFilteredData,
}
