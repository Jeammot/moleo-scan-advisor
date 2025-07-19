export type ProductRecommendation = {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  productUrl: string;
  tagline: string;
  scientificNote?: string;
  ingredients?: {
    name: string;
    dosage: string;
    }[];
};

export const MOLEO_PRODUCTS: ProductRecommendation[] = [
  {
    id: 'prod_energy',
    name: 'ENERGY',
    description: 'Boost your daily energy levels with a clean and effective formula.',
    price: '$29.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/1_5617574a-2639-4089-9a34-ee7c00be73e3.png?v=1748776015',
    productUrl: 'https://moleo.io/products/energy',
    tagline: 'Recharge your day without the crash',
    scientificNote: 'Combines high-dose Vitamin C and zinc to fuel cellular vitality, while rose hips offer antioxidant support for sustained energy production.',
    ingredients: [
  { name: "Vitamin C", dosage: "2000 mg" },
  { name: "Zinc", dosage: "40 mg" },
  { name: "Rosehip Extract", dosage: "50 mg" }
  ],
  },
  {
    id: 'prod_focus',
    name: 'FOCUS',
    description: 'Enhance mental clarity and concentration throughout the day.',
    price: '$29.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/3_9f2e2ebb-f586-45e2-8ce9-922dd93f24b6.png?v=1748775945',
    productUrl: 'https://moleo.io/products/focus',
    tagline: 'Mental clarity, minus the jitters',
    scientificNote: 'Vitamin B6 and magnesium taurate contribute to balanced neurotransmitter activity, while a curated blend of botanical extracts supports clarity, circulation, and mental resilience.',
  ingredients: [
  { name: "Vitamin B6", dosage: "unknown" },
  { name: "Magnesium Taurate", dosage: "unknown" },
  { name: "Black Pepper Extract", dosage: "unknown" }
    ],
  },
  {
    id: 'prod_sleep',
    name: 'SLEEP',
    description: 'Supports restful sleep and overnight recovery.',
    price: '$29.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/5_62cff5ad-9536-4fb7-bd9d-7989df31b0b1.png?v=1748775894',
    productUrl: 'https://moleo.io/products/sleep',
    tagline: 'Fall asleep gently, wake up clear',
    scientificNote: 'This advanced blend combines melatonin, magnesium, and calming botanicals like ashwagandha and valerian to help ease sleep latency and support deep, restorative rest.',
 ingredients: [
  { name: "Magnesium", dosage: "100 mg" },
  { name: "L-Tryptophan", dosage: "500 mg" },
  { name: "Valerest Proprietary Blend of Valerian", dosage: "228,9 mg" },
  { name: "Ashwagandha", dosage: "125 mg" },
  { name: "GABA", dosage: "100 mg" },
  { name: "Chamomile", dosage: "75 mg" },
  { name: "Passionflower", dosage: "75 mg" },
  { name: "Melatonin", dosage: "5 mg" }
   ],
  },
  {
    id: 'prod_calm',
    name: 'CALM',
    description: 'Promotes relaxation and emotional balance.',
    price: '$29.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/7_b5bb00f6-795c-42ce-9016-b065a1abf10a.png?v=1748775973',
    productUrl: 'https://moleo.io/products/calm',
    tagline: 'Ease your mind, without sedation',
    scientificNote: 'This calming complex blends ashwagandha, saffron, and 5-HTP to help regulate stress responses, support serotonin production, and promote emotional balance.',
 ingredients: [
  { name: "Ashwagandha", dosage: "400 mg" },
  { name: "L-Theanine", dosage: "200 mg" },
  { name: "Ginkgo Biloba", dosage: "200 mg" },
  { name: "St. John’s Wort", dosage: "200 mg" },
  { name: "Rhodiola Rosea", dosage: "100 mg" },
  { name: "Saffron", dosage: "100 mg" },
  { name: "5-HTP", dosage: "50 mg" }
   ],
  },
  {
    id: 'prod_heart',
    name: 'HEART',
    description: 'Formulated to support cardiovascular health.',
    price: '$34.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/9_c85901f5-c491-4c68-8317-9aa2c915a057.png?v=1748775952',
    productUrl: 'https://moleo.io/products/heart',
    tagline: 'Care for your heart, daily',
    scientificNote: 'High-strength EPA and DHA work together to promote cardiovascular function, regulate triglycerides, and support overall heart resilience.',
  ingredients: [
  { name: "Omega-3 Fish Oil", dosage: "4080 mg" },
  { name: "Omega-3 Fatty Acids", dosage: "2250 mg" },
  { name: "EPA", dosage: "5000 mg" },
  { name: "DHA", dosage: "3000 mg" },
  { name: "Other Omega-3 Fatty Acids", dosage: "150 mg" }
    ],
  },
  {
    id: 'prod_vision',
    name: 'VISION',
    description: 'Supports eye health and visual clarity.',
    price: '$34.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/11_284b06be-0e0a-4922-bb4c-d3c89f88b152.png?v=1748775946',
    productUrl: 'https://moleo.io/products/vision',
    tagline: 'Protect your vision, see clearly',
   scientificNote: 'Lutein, zeaxanthin and bilberry extract work in synergy to help filter blue light, protect retinal cells, and support long-term eye health.',
  ingredients: [
  { name: "Vitamin A", dosage: "160 mg RAE" },
  { name: "Vitamin C", dosage: "200 mg" },
  { name: "Vitamin E", dosage: "20 mg" },
  { name: "Vitamin B12", dosage: "27 mcg" },
  { name: "Magnesium ", dosage: "40 mg" },
  { name: "Zinc ", dosage: "28 mg" },
  { name: "Lutein", dosage: "100 mg" },
  { name: "Zeaxanthin ", dosage: "32 mg" },
  { name: "Bilberry Blueberry Extract ", dosage: "300 mg" }
    ],
  },
  {
    id: 'prod_skin',
    name: 'SKIN',
    description: 'Nourishes and protects the skin from within.',
    price: '$34.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/13_c539c2c0-c00a-4f44-aa99-75667f95cbe8.png?v=1748775975',
    productUrl: 'https://moleo.io/products/skin',
    tagline: 'Glow naturally, from the inside out',
    scientificNote: 'Collagen peptides, biotin, and hyaluronic acid work together to support skin elasticity, hydration, and overall glow from within.',
  ingredients: [
  { name: "Vitamin A", dosage: "2000 mcg RAE" },
  { name: "Vitamin C", dosage: "60 mg" },
  { name: "Vitamin E", dosage: "10 mg" },
  { name: "Folate", dosage: "666,67 mcg DFE" },
  { name: "Biotin ", dosage: "6666,67 mcg" },
  { name: "Zinc ", dosage: "33333,33 mcg" },
  { name: "Magnesium", dosage: "100 mg" },
  { name: "Collagen Complex ", dosage: "666,67 mg" },
  { name: "Grape Seed Extract ", dosage: "150 mg" },
  { name: "Quercetin", dosage: "66,67 mg" },
  { name: "Proprietary Blend ", dosage: "250,67 mg" },
  { name: "Black Pepper ", dosage: "3,33 mg" } 
    ],
  },
  {
    id: 'prod_libido',
    name: 'LIBIDO',
    description: 'Formulated to support sexual health and vitality.',
    price: '$34.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/15_7424ce7c-3e6b-4b63-8b14-a058fc4be2d9.png?v=1748775932',
    productUrl: 'https://moleo.io/products/libido',
    tagline: 'Feel confident, feel alive',
    scientificNote: 'Maca root is clinically recognized for enhancing libido and stamina, while black pepper extract improves absorption for faster effects.',
 ingredients: [
  { name: "Organic Maca Root Blend", dosage: "2000 mg" },
  { name: "Organic Black Pepper Fruit Extract ", dosage: "3,33 mg" }
   ],
  },
  {
    id: 'prod_bones',
    name: 'BONES',
    description: 'Promotes strong bones and joint support.',
    price: '$34.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/17_a288dea4-0954-4bf4-af0e-ccf5a5657718.png?v=1748775968',
    productUrl: 'https://moleo.io/products/bones',
    tagline: 'Build strength from within',
    scientificNote: 'A powerful collagen blend from bovine, fish, and eggshell sources to strengthen bones, improve mobility, and promote long-term joint resilience.',
  ingredients: [
  { name: "Vitamin C", dosage: "33,33 mg" },
  { name: "Calcium ", dosage: "4,67 mg" },
  { name: "Multi Source Collagen Complex ", dosage: "1066,67 mg" }
    ],
  },
  {
    id: 'prod_digest',
    name: 'DIGEST',
    description: 'Supports healthy digestion and gut balance.',
    price: '$34.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/19_6740c65c-f19f-4044-ab7e-16d70e04246b.png?v=1748775956',
    productUrl: 'https://moleo.io/products/digest',
    tagline: 'Gentle on your gut, powerful on results',
    scientificNote: 'Probiotics and digestive enzymes help maintain microbiome health and improve digestion.',
  ingredients: [
  { name: "Wholefood Raw Probiotic Complex", dosage: "00 Billion CFU 34 STRAINS" },
  { name: "Organic Prebiotic Complex ", dosage: "150 mg" },
  { name: "Digestive Enzyme Complex ", dosage: "200 mg" },
  { name: "Fruit and Vegetable Complex ", dosage: "50 mg" }
    ],
  },
  {
    id: 'prod_hair',
    name: 'HAIR',
    description: 'Supports hair growth and strength from within.',
    price: '$34.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/21_d53a61c7-0947-42ee-959c-9e31cecf78a6.png?v=1748775968',
    productUrl: 'https://moleo.io/products/hair',
    tagline: 'Stronger strands, healthier roots',
    scientificNote: 'Biotin, silica, and keratin precursors may promote growth and reduce breakage.',
  ingredients: [
  { name: "Biotin (as d-Biotin USP)", dosage: "10000 mcg" }
    ],
  },
  {
    id: 'prod_iron',
    name: 'IRON',
    description: 'Essential iron support for vitality and oxygen transport.',
    price: '$24.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/27_4d30559b-82d9-48a7-94a9-923ca10a6917.png?v=1748775883',
    productUrl: 'https://moleo.io/products/iron',
    tagline: 'Vitality starts with your blood',
    scientificNote: 'Iron bisglycinate is a gentle form that helps restore iron levels and reduce fatigue.',
  ingredients: [
 { name: "Iron (as ferrous bisglycinate)", dosage: "18 mg" }
    ],
  },
  {
    id: 'prod_vitamind',
    name: 'VITAMIN D',
    description: 'Supports immune function and bone health.',
    price: '$24.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/29_2b9613d9-6444-43bc-912a-b44186a661a4.png?v=1748775861',
    productUrl: 'https://moleo.io/products/vitamin-d',
    tagline: 'Sunshine support, every day',
    scientificNote: 'Vitamin D3 enhances calcium absorption and supports immunity and mood.',
    ingredients: [
 { name: "Vitamin D (as D3 Cholecalciferol) (from Lanolin)", dosage: "125 mcg (5,000 IU)" }
      ],
  },
  {
    id: 'prod_vitaminb12',
    name: 'VITAMIN B12',
    description: 'Essential for energy and nervous system support.',
    price: '$24.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/31_33e7acd3-b997-49ee-a51a-bcd7dff98e14.png?v=1748775861',
    productUrl: 'https://moleo.io/products/vitamin-b12',
    tagline: 'Energy and clarity, in one drop',
    scientificNote: 'B12 helps convert food into energy and supports cognitive and nervous system health.',
    ingredients: [
 { name: "Vitamin B12 (as Methylcobalamin)", dosage: "1000 mcg " },
 { name: "Organic Spirulina (Whole Plant)", dosage: "200 mg " }  
      ],
  },
  {
    id: 'prod_iodine',
    name: 'IODINE',
    description: 'Supports thyroid function and metabolic health.',
    price: '$24.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/33_ef4fe1dd-365e-44e4-84cf-9d827504c9d0.png?v=1748775874',
    productUrl: 'https://moleo.io/products/iodine',
    tagline: 'Thyroid support that adapts to you',
    scientificNote: 'Iodine is critical for thyroid hormone production, influencing energy and metabolism.',
    ingredients: [
 { name: "Potassium Iodide", dosage: "65 mg " }
      ],
  },
  {
    id: 'prod_magnesium',
    name: 'MAGNESIUM',
    description: 'Helps muscle function, relaxation, and recovery.',
    price: '$24.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/31_33e7acd3-b997-49ee-a51a-bcd7dff98e14.png?v=1748775861',
    productUrl: 'https://moleo.io/products/magnesium',
    tagline: 'Calm your body, fuel your function',
    scientificNote: 'Magnesium supports over 300 biochemical reactions, including muscle and nerve function.',
    ingredients: [
 { name: "Magnesium (as Glycinate Chelate, Citrate, Malate)", dosage: "400 mg " }
      ],
  },
{
    id: 'prod_cycle',
    name: 'CYCLE',
    description: 'Maintain hormonal harmony and ease menstrual discomfort naturally.',
    price: '$29.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/25_b7fad280-0a04-4a04-a9d5-d2477f329bbb.png?v=1748775959',
    productUrl: 'https://moleo.io/products/cycle',
    tagline: 'Restore monthly balance and embrace your natural rhythm',
    scientificNote: 'Formulated with myo-inositol and D-chiro inositol, this blend helps restore ovarian function and hormonal balance, essential for a smoother menstrual cycle.',
    ingredients: [
 { name: "Myo-Inositol", dosage: "1000 mg " },
 { name: "D-Chiro Inositol (Caronositol®)", dosage: "25 mg " }
      ],
  },
{
    id: 'prod_intima',
    name: 'INTIMA',
    description: 'Preserve natural balance and freshness with precision and care.',
    price: '$29.90',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0894/6476/6800/files/23_14a9f05b-ed51-4a90-8185-8adab679d4ab.png?v=1748775932',
    productUrl: 'https://moleo.io/products/intima',
    tagline: 'Intimate wellness, redefined for you.',
    scientificNote: 'A high-potency blend of probiotics and prebiotics clinically studied to maintain vaginal pH, reinforce intimate flora, and reduce discomfort.',
    ingredients: [
 { name: "Probiotic Women’s Blend", dosage: "266 mg " },
 { name: "Prebiotic Blend", dosage: "200 mg " },
 { name: "D-Mannose", dosage: "120 mg " },
 { name: "Cranberry Fruit Powder (Pro Cran d’Or) ", dosage: "100 mg " }
      ]
  }
];
