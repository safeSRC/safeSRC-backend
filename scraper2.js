import request from 'request';
import cheerio from 'cheerio';

const URL = 'https://dontcallthepolice.com/';


export function scrapeData(URL) {
  request(URL, async (err, response, body) => {
    if (err) console.error(err);
    
    const $ = cheerio.load(body);
    
    const cityName = $('h1').text();

    const serviceNames = $('.entry-content > ul > li:nth-child(1)').toArray();
      
    const mappedServiceNames = serviceNames.map(name => {
      return name.children[0].data;
    });
      
    const descriptions = $('.entry-content > ul > li > ul > li:nth-child(1)').toArray();
      
    const mappedDescriptions = descriptions.map(description => {
      return description.children[0].data;
    });
      
    const list1 = $('.entry-content > ul > li > ul > li:nth-child(2)').toArray();
      
    const Array1 = list1.map(item => {
      return item.children[0].data;
    });

    const list2 = $('.entry-content > ul > li > ul > li:nth-child(3)').toArray();
      
    const Array2 = list2.map(item => {
      return item.children[0].data;
    });

    const list3 = $('.entry-content > ul > li > ul > li:nth-child(4)').toArray();
      
    const Array3 = list3.map(item => {
      return item.children[0].data;
    });

    const list4 = $('.entry-content > ul > li > ul > li:nth-child(5)').toArray();
      
    const Array4 = list4.map(item => {
      return item.children[0].data;
    });

    
    const resources = mappedServiceNames.map((name, index) => {
      const result = {};
      result.srcName = name;
      result.description = mappedDescriptions[index] ?? 'Description Unavailable';
      result.info = [
        Array1[index] ?? 'info unvailable', 
        Array2[index] ?? 'info unavailable', 
        Array3[index] ?? 'info unavailable', 
        Array4[index] ?? 'info unavailable'
      ];
      return result;
    });

    const cities = {
      cityName
    };
      
    console.log(cities, resources); 
  });
}

scrapeData(`${URL}portland`);
