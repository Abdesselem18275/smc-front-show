import countryNames from '../assets/data/world-countries.json';



export function countries() {
      let countryArray = [];
      Object.keys(countryNames).forEach( x => {
        const item = {
          key : x ,
          val : countryNames[x]
        };
        countryArray.push(item);
      });
      countryArray = countryArray.sort(function(a, b) {
        const nameA = a.val.toUpperCase();
        const nameB = b.val.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      countryArray.unshift({
        key: '',
        val: '',
        disabled: false
      });
    return <any[]> countryArray;
  }
