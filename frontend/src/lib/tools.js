export const prompt = (form) => {
    return `
Generate a lifelike image of clothing that beautifully embodies 
the following requirements:

- ${form.prompt}
- Fit: ${form.fit}
- Gender: ${form.gender}
- Size: ${form.size}
- Category: ${form.category}
- Material: ${form.material}
- Pattern: ${form.pattern}
- Style: ${form.style}
- Background: Plain white

Ensure that the clothing item in the image appears incredibly 
lifelike, with meticulous attention to detail. The focus should 
be on presenting the clothing in a manner that it closely 
resembles a real-world garment.
  
  `;
  };
  



export const tags = {
    gender: [
        "male",
        "female",
    ],
    category: [
        "blazer",
        "blouse",
        "bodysuit",
        "button-down shirt",
        "cardigan",
        "chinos",
        "coat",
        "crop top",
        "dress",
        "halter top",
        "hoodie",
        "jacket",
        "jeans",
        "jumpsuit",
        "kimono",
        "overalls",
        "polo shirt",
        "poncho",
        "romper",
        "shawl",
        "shirt",
        "shorts",
        "skirt",
        "suit",
        "sweater",
        "sweatpants",
        "sweatshirt",
        "t-shirt",
        "tank top",
        "tights",
        "trousers",
        "tunic",
        "tuxedo",
        "vest",
    ],
    style: [
        'athleisure',
        'avant-garde',
        'bohemian',
        'business',
        'casual',
        'classic',
        'edgy',
        'formal',
        'gothic',
        'grunge',
        'hipster',
        'maxi',
        'military',
        'minimalistic',
        'modern',
        'preppy',
        'punk',
        'safari',
        'sporty',
        'streetwear',
        'vintage',
        'western',
    ],
    material: [
        "cashmere",
        "corduroy",
        "cotton",
        "denim",
        "faux fur",
        "flannel",
        "hemp",
        "lace",
        "leather",
        "linen",
        "mesh",
        "nylon",
        "polyester",
        "satin",
        "silk",
        "suede",
        "tweed",
        "velvet",
        "wool",
    ],
    pattern: [
        "animal print",
        "argyle",
        "checkered",
        "chevron",
        "damask",
        "floral",
        "gingham",
        "houndstooth",
        "paisley",
        "plaid",
        "polka-dot",
        "striped",
        "tie-dye",
    ],
    fit: [
        "athletic",
        "cinched",
        "clingy",
        "draped",
        "fitted",
        "flared",
        "flouncy",
        "loose",
        "oversized",
        "regular",
        "relaxed",
        "roomy",
        "semi-fitted",
        "skinny",
        "slim",
        "snug",
        "straight",
        "tailored",
        "tapered",
        "trim",
    ],
    size: [
        "athletic",
        "plus",
        "regular",
        "slim",

    ],
}