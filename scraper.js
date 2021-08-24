import request from 'request';
import cheerio from 'cheerio';

const URL = 'https://dontcallthepolice.com/';


export function scrapeDontCallThePolice(URL) {
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
      result.description = mappedDescriptions[index] ?? 'Description Unavailable';
      result.website = mappedWebsites[index] ?? 'Website Unavailable';
      result.number = mappedNumbers[index] ?? 'Phone Number Unavailable';
      return result;
    });
      
    console.log(data); 
  });
}


scrapeDontCallThePolice(`${URL}portland`);
//scrapeDontCallThePolice(`${URL}san-jose-ca`);
//scrapeDontCallThePolice(`${URL}kalamazoo-mi`);
//scrapeDontCallThePolice(`${URL}riverside-ca`);
//scrapeDontCallThePolice(`${URL}morongo-basin-ca`);
//scrapeDontCallThePolice(`${URL}charleston-sc`);
//scrapeDontCallThePolice(`${URL}charlottesville`);
//scrapeDontCallThePolice(`${URL}wilmington-de`);


