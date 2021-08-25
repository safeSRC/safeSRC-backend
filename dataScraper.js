import dotenv from 'dotenv';
dotenv.config();
import request from 'request';
import cheerio from 'cheerio';
import Resource from './lib/Model/Resource.js';
import City from './lib/Model/City.js';

const URL = 'https://dontcallthepolice.com/';

export function scrapeData(URL) {
  request(URL, async (err, response, body) => {
    if (err) console.error(err);

    const $ = cheerio.load(body);

    const city = $('h1').text();

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

    const Array1 = list1.map((item) => {
      return item.children[0].data;
    });

    const list2 = $(
      '.entry-content > ul > li > ul > li:nth-child(3)'
    ).toArray();

    const Array2 = list2.map((item) => {
      return item.children[0].data;
    });

    const list3 = $(
      '.entry-content > ul > li > ul > li:nth-child(4)'
    ).toArray();

    const Array3 = list3.map((item) => {
      return item.children[0].data;
    });

    const list4 = $(
      '.entry-content > ul > li > ul > li:nth-child(5)'
    ).toArray();

    const Array4 = list4.map((item) => {
      return item.children[0].data;
    });

    const resources = mappedServiceNames.map((name, index) => {
      const result = {};
      result.src_name = name;
      result.src_description =
        mappedDescriptions[index] ?? 'Description Unavailable';
      result.city_id = '1';
      result.info = [
        Array1[index] ?? 'info unvailable',
        Array2[index] ?? 'info unavailable',
        Array3[index] ?? 'info unavailable',
        Array4[index] ?? 'info unavailable',
      ];
      result.tags = [];
      return result;
    });

    Promise.all(
      resources.map(async (resource) => {
        return await Resource.insert(resource);
      })
    );

    await City.insert({ city });
  });
}

const cityArray = [
  'portland',
  //'san-jose-ca',
  // 'kalamazoo-mi',
  // 'riversid-ca',
  // 'morongo-basin-ca',
  // 'charleston-sc',
  // 'charlottesville',
  // 'wilmington-de',
  // 'syracuse-ny',
  // 'rochester-ny',
  // 'albany-ny',
  // 'birmingham',
  // 'burlington',
  // 'emporia-ks',
  // 'santa-barbara',
  // 'livermore-ca',
  // 'albuquerque',
  // 'savannah',
  // 'buffalo-ny',
  // 'providence',
  // 'cleveland',
  // 'las-vegas',
  // 'kenosha-racine',
  // 'richmond',
  // 'redding',
  // 'augusta',
  // 'honolulu',
  // 'omaha',
  // 'olympia',
  // 'boise',
  // 'newark',
  // 'binghamton',
  // 'duluth',
  // 'pittsburgh',
  // 'milwaukee',
  // 'hattiesburg',
  // 'lexington',
  // 'grand-rapids',
  // 'sacramento',
  // 'columbia',
  // 'oakland',
  // 'tampa',
  // 'jackson',
  // 'orlando',
  // 'eugene',
  // 'anchorage',
  // 'austin',
  // 'washington-d-c',
  // 'st-louis',
  // 'seattle',
  // 'san-francisco',
  // 'san-diego',
  // 'salt-lake-city',
  // 'philadelphia',
  // 'oklahoma-cty',
  // 'new-orleans',
  // 'nashville',
  // 'minneapolis',
  // 'miami',
  // 'indianapolis',
  // 'houston',
  // 'detriot',
  // 'denver',
  // 'columbus',
  // 'charlotte',
  // 'boston',
  // 'baltimore',
  // 'atlanta',
  // 'chicago',
  // 'phoenix',
  // 'new-york-city',
  // 'louisville',
  // 'dallas',
  // 'los-angeles'
];

cityArray.forEach((city) => scrapeData(`${URL}${city}`));
