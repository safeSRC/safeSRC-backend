import request from 'request';
import cheerio from 'cheerio';
const URL = 'https://dontcallthepolice.com/portland/';

export function scrapeData(URL) {
  request(URL, async (err, response, body) => {
    if (err) console.error(err);
    
    const $ = cheerio.load(body);
    
    const serviceNames = $('.entry-content > ul > li:nth-child(1)').toArray();
      
    const mappedServiceNames = serviceNames.map(name => {
      return name.children[0].data;
    });
      
    const descriptions = $('.entry-content > ul > li > ul > li:nth-child(1)').toArray();
      
    const mappedDescriptions = descriptions.map(description => {
      return description.children[0].data;
    });
      
    const websites = $('.entry-content > ul > li > ul > li > a').toArray();
      
    const mappedWebsites = websites.map(website => {
      return website.children[0].data;
    });

    const phoneNumbers = $('.entry-content > ul > li > ul > li:nth-child(2)').toArray();
      
    const mappedNumbers = phoneNumbers.map(phoneNumber => {
      return phoneNumber.children[0].data;
    });
    
    const data = mappedServiceNames.map((name, index) => {
      const result = {};
      result.name = name;
      result.description = mappedDescriptions[index];
      result.website = mappedWebsites[index];
      result.number = mappedNumbers[index];
      return result;
    });
      
    console.log(data, 'this is the data');
  });
}
scrapeData(URL);
