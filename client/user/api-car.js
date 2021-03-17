


const create = async (car) => {
    try {
        let response = await fetch('/api/cars', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(car)
        })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  

  const list = async (signal) => {
    try {
      let response = await fetch('/api/cars', {
        method: 'GET',
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  export {
    create,
    list
  }