const places = [
    { name: "france", lat: 46.227638, lng: 2.213749, size: 1.1, color: "white" },
    {
      name: "canada",
      lat: 56.130366,
      lng: -106.34677099999999,
      size: 0.39,
      color: "white"
    },
    {
      name: "spain",
      lat: 40.463667,
      lng: -3.7492199999999998,
      size: 0.28,
      color: "white"
    },
    {
      name: "malaysia",
      lat: 4.210483999999999,
      lng: 101.97576600000001,
      size: 0.13,
      color: "white"
    },
    {
      name: "germany",
      lat: 51.165690999999995,
      lng: 10.451526,
      size: 0.32,
      color: "white"
    },
    {
      name: "mexico",
      lat: 23.634501,
      lng: -102.552784,
      size: 0.15,
      color: "white"
    },
    {
      name: "saudi arabia",
      lat: 23.885942,
      lng: 45.079162,
      size: 0.19,
      color: "white"
    },
    {
      name: "belgium",
      lat: 50.503887,
      lng: 4.469936,
      size: 0.16,
      color: "white"
    },
    {
      name: "sweden",
      lat: 60.128161,
      lng: 18.643501,
      size: 0.23,
      color: "white"
    },
    {
      name: "brazil",
      lat: -14.235004,
      lng: -51.92528,
      size: 0.16,
      color: "white"
    },
    {
      name: "switzerland",
      lat: 46.818188,
      lng: 8.227511999999999,
      size: 0.16,
      color: "white"
    },
    {
      name: "new zealand",
      lat: -40.900557,
      lng: 174.88597099999998,
      size: 0.12,
      color: "white"
    },
    {
      name: "poland",
      lat: 51.919438,
      lng: 19.145135999999997,
      size: 0.18,
      color: "white"
    },
    {
      name: "egypt",
      lat: 26.820553000000004,
      lng: 30.802497999999996,
      size: 0.24,
      color: "white"
    },
    {
      name: "ethiopia",
      lat: 9.145,
      lng: 40.489672999999996,
      size: 0.13,
      color: "white"
    },
    {
      name: "tunisia",
      lat: 33.886917,
      lng: 9.537499,
      size: 0.22,
      color: "white"
    },
    {
      name: "oman",
      lat: 21.512583,
      lng: 55.923255000000005,
      size: 0.1,
      color: "white"
    },
    {
      name: "south africa",
      lat: -30.559482,
      lng: 22.937506,
      size: 0.11,
      color: "white"
    },
    { name: "india", lat: 20.593684, lng: 78.96288, size: 0.16, color: "white" },
    {
      name: "yemen",
      lat: 15.552726999999999,
      lng: 48.516388,
      size: 0.1,
      color: "white"
    },
    { name: "kenya", lat: -0.023559, lng: 37.906193, size: 0.12, color: "white" },
    {
      name: "algeria",
      lat: 28.033886,
      lng: 1.6596259999999998,
      size: 0.12,
      color: "white"
    },
    {
      name: "colombia",
      lat: 4.570868,
      lng: -74.297333,
      size: 0.15,
      color: "white"
    },
    {
      name: "israel",
      lat: 31.046051000000002,
      lng: 34.851612,
      size: 0.1,
      color: "white"
    },
    {
      name: "kuwait",
      lat: 29.311659999999996,
      lng: 47.481766,
      size: 0.15,
      color: "white"
    },
    {
      name: "japan",
      lat: 36.204824,
      lng: 138.252924,
      size: 0.14,
      color: "white"
    },
    { name: "italy", lat: 41.87194, lng: 12.56738, size: 0.16, color: "white" },
    {
      name: "greece",
      lat: 39.074208,
      lng: 21.824312,
      size: 0.13,
      color: "white"
    },
    {
      name: "australia",
      lat: -25.274398,
      lng: 133.775136,
      size: 0.14,
      color: "white"
    },
    {
      name: "latvia",
      lat: 56.879635,
      lng: 24.603189,
      size: 0.11,
      color: "white"
    },
    {
      name: "singapore",
      lat: 1.352083,
      lng: 103.819836,
      size: 0.1,
      color: "white"
    },
    {
      name: "portugal",
      lat: 39.399871999999995,
      lng: -8.224454,
      size: 0.13,
      color: "white"
    },
    {
      name: "hungary",
      lat: 47.162494,
      lng: 19.503304,
      size: 0.12,
      color: "white"
    },
    {
      name: "iran",
      lat: 32.427908,
      lng: 53.68804599999999,
      size: 0.12,
      color: "white"
    },
    { name: "croatia", lat: 45.1, lng: 15.2, size: 0.1, color: "white" },
    {
      name: "nepal",
      lat: 28.394857000000002,
      lng: 84.12400799999999,
      size: 0.1,
      color: "white"
    },
    {
      name: "indonesia",
      lat: -0.789275,
      lng: 113.921327,
      size: 0.11,
      color: "white"
    },
    {
      name: "ecuador",
      lat: -1.8312389999999998,
      lng: -78.183406,
      size: 0.1,
      color: "white"
    },
    {
      name: "chile",
      lat: -35.675146999999996,
      lng: -71.542969,
      size: 0.1,
      color: "white"
    },
    {
      name: "tanzania",
      lat: -6.369028,
      lng: 34.888822,
      size: 0.1,
      color: "white"
    },
    { name: "uganda", lat: 1.373333, lng: 32.290275, size: 0.1, color: "white" },
    {
      name: "pakistan",
      lat: 30.375321000000003,
      lng: 69.345116,
      size: 0.11,
      color: "white"
    },
    {
      name: "turkey",
      lat: 38.963745,
      lng: 35.243322,
      size: 0.12,
      color: "white"
    },
    {
      name: "bulgaria",
      lat: 42.733883,
      lng: 25.48583,
      size: 0.1,
      color: "white"
    },
    {
      name: "czech republic",
      lat: 49.817492,
      lng: 15.472961999999999,
      size: 0.11,
      color: "white"
    },
    {
      name: "romania",
      lat: 45.943160999999996,
      lng: 24.96676,
      size: 0.13,
      color: "white"
    },
    {
      name: "ukraine",
      lat: 48.379433,
      lng: 31.16558,
      size: 0.12,
      color: "white"
    },
    {
      name: "albania",
      lat: 41.153332,
      lng: 20.168331,
      size: 0.1,
      color: "white"
    },
    {
      name: "lebanon",
      lat: 33.854721000000005,
      lng: 35.862285,
      size: 0.11,
      color: "white"
    },
    {
      name: "nigeria",
      lat: 9.081999,
      lng: 8.675277000000001,
      size: 0.11,
      color: "white"
    },
    {
      name: "vietnam",
      lat: 14.058323999999999,
      lng: 108.277199,
      size: 0.13,
      color: "white"
    },
    {
      name: "finland",
      lat: 61.92411,
      lng: 25.748151,
      size: 0.12,
      color: "white"
    },
    { name: "norway", lat: 60.472024, lng: 8.468946, size: 0.11, color: "white" },
    { name: "denmark", lat: 56.26392, lng: 9.501785, size: 0.11, color: "white" },
    {
      name: "south korea",
      lat: 35.907757000000004,
      lng: 127.766922,
      size: 0.11,
      color: "white"
    },
    { name: "peru", lat: -9.189967, lng: -75.015152, size: 0.11, color: "white" },
    {
      name: "philippines",
      lat: 12.879721,
      lng: 121.77401699999999,
      size: 0.1,
      color: "white"
    },
    {
      name: "azerbaijan",
      lat: 40.143105,
      lng: 47.576927000000005,
      size: 0.1,
      color: "white"
    },
    {
      name: "uzbekistan",
      lat: 41.377491,
      lng: 64.585262,
      size: 0.1,
      color: "white"
    },
    {
      name: "ghana",
      lat: 7.946527000000001,
      lng: -1.0231940000000002,
      size: 0.1,
      color: "white"
    },
    {
      name: "estonia",
      lat: 58.595271999999994,
      lng: 25.013607,
      size: 0.11,
      color: "white"
    },
    {
      name: "kazakhstan",
      lat: 48.019573,
      lng: 66.923684,
      size: 0.1,
      color: "white"
    },
    {
      name: "argentina",
      lat: -38.416097,
      lng: -63.616671999999994,
      size: 0.11,
      color: "white"
    },
    { name: "monaco", lat: 43.750298, lng: 7.412841, size: 0.11, color: "white" },
    {
      name: "slovenia",
      lat: 46.151241,
      lng: 14.995463,
      size: 0.11,
      color: "white"
    },
    {
      name: "russia",
      lat: 61.52401,
      lng: 105.31875600000001,
      size: 0.12,
      color: "white"
    },
    { name: "sudan", lat: 12.862807, lng: 30.217636, size: 0.1, color: "white" },
    { name: "iraq", lat: 33.223191, lng: 43.679291, size: 0.1, color: "white" },
    { name: "rwanda", lat: -1.940278, lng: 29.873888, size: 0.1, color: "white" },
    { name: "qatar", lat: 25.354826, lng: 51.183884, size: 0.1, color: "white" },
    {
      name: "costa rica",
      lat: 9.748917,
      lng: -83.753428,
      size: 0.1,
      color: "white"
    }
  ];
  export default places;
  