import dotenv from 'dotenv';
dotenv.config();
// `request` has been deprecated as of Feb 2020.
// since this file is making a lot of multiple
// requests, you can use `node-fetch` — which uses Promises —
// to run the scraper sequentially
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import Resource from './lib/models/Resource.js';
import City from './lib/models/City.js';

const URL = 'https://dontcallthepolice.com/';

export function scrapeData(url) {
  // This function now returns a Promise, which we can
  // `await` before scraping the next page.
  // This prevents the "Error connecting to database" city name issue,
  // at the cost of running much slower.
  return fetch(url).then(
    async (res) => {
      const body = await res.text();
      const $ = cheerio.load(body);
      const cityName = $('h1').text();

      /*
      There's a lot of repeated code for scraping each of these sections.
      How might you refactor this to reduce duplication?

      A function would be a great use for this. eg:

        function getContentFromSelector(selector) {
          return selector.toArray().map((html) => html.children[0].data)
        }
    
        const serviceNames = getContentFromSelector($('.entry-content > ul > li:nth-child(1)'))
        const descriptions = getContentFromSelector($('.entry-content > ul > li > ul > li:nth-child(1)'))
    */

      const serviceNames = $('.entry-content > ul > li:nth-child(1)').toArray();

      const mappedServiceNames = serviceNames.map((name) => {
        return name.children[0].data;
      });

      const descriptions = $(
        '.entry-content > ul > li > ul > li:nth-child(1)'
      ).toArray();

      const mappedDescriptions = descriptions.map((description) => {
        return description.children[0].data;
      });

      const list1 = $(
        '.entry-content > ul > li > ul > li:nth-child(2)'
      ).toArray();

      // Make sure variable names like this aren't capitalized
      // Capitalized names generally refer to classes
      const infoSection1 = list1.map((item) => {
        return item.children[0].data;
      });

      const list2 = $(
        '.entry-content > ul > li > ul > li:nth-child(3)'
      ).toArray();

      const infoSection2 = list2.map((item) => {
        return item.children[0].data;
      });

      const list3 = $(
        '.entry-content > ul > li > ul > li:nth-child(4)'
      ).toArray();

      const infoSection3 = list3.map((item) => {
        return item.children[0].data;
      });

      const list4 = $(
        '.entry-content > ul > li > ul > li:nth-child(5)'
      ).toArray();

      const infoSection4 = list4.map((item) => {
        return item.children[0].data;
      });

      const city = await City.insert({ city: cityName });

      const resources = mappedServiceNames.map((name, index) => {
        const result = {};
        result.srcName = name ?? 'No Provided Name';
        result.srcDescription =
          mappedDescriptions[index] ?? 'Description Unavailable';
        result.cityId = city.id;
        result.info = [
          infoSection1[index] ?? '',
          infoSection2[index] ?? '',
          infoSection3[index] ?? '',
          infoSection4[index] ?? '',
        ];
        result.categoryId = '1';
        result.tags = [];

        return result;
      });

      return Promise.all(
        resources.map(async (resource) => {
          return Resource.insert(resource);
        })
      );
    },
    (err) => console.error(err) // Error handler is now the second parameter
  );
}

const cityArray = [
  'portland',
  'san-jose-ca',
  'kalamazoo-mi',
  'riverside-ca',
  'morongo-basin-ca',
  'charleston-sc',
  'charlottesville',
  'syracuse-ny',
  'rochester-ny',
  'albany-ny',
  'birmingham',
  'burlington',
  'emporia-ks',
  'santa-barbara',
  'livermore-ca',
  'albuquerque',
  'savannah',
  'buffalo-ny',
  'providence',
  'cleveland',
  'las-vegas',
  'kenosha-racine',
  'richmond',
  'redding',
  'augusta',
  'honolulu',
  'omaha',
  'olympia',
  'boise',
  'newark',
  'binghamton',
  'duluth',
  'pittsburgh',
  'milwaukee',
  'hattiesburg',
  'lexington',
  'grand-rapids',
  'sacramento',
  'columbia',
  'oakland',
  'tampa',
  'jackson',
  'orlando',
  'eugene',
  'anchorage',
  'austin',
  'washington-d-c',
  'st-louis',
  'seattle',
  'san-francisco',
  'san-diego',
  'salt-lake-city',
  'philadelphia',
  'oklahoma-cty',
  'new-orleans',
  'nashville',
  'minneapolis',
  'miami',
  'indianapolis',
  'houston',
  'detroit',
  'denver',
  'columbus',
  'charlotte',
  'boston',
  'baltimore',
  'atlanta',
  'chicago',
  'phoenix',
  'new-york-city',
  'louisville',
  'dallas',
  'los-angeles',
];

/*
Here's how we can run Promises sequentially and prevent
the database from getting overloaded with connections.
This means you can just run the scraper once, rather
than having to run it in batches.

https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
*/
cityArray.reduce(async (prevCity, city) => {
  await prevCity;
  return scrapeData(`${URL}${city}`);
}, Promise.resolve());
