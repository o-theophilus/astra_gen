import { writable, get } from 'svelte/store';
export const thinking = writable(false);
export const module = writable(false);


export const states = [
    "welcome",
    "ask name", "validate name",
    "ask age", "validate age",
    "thank user for into / ask for fabric / validate",
    "upload texture / idea",
    "have fabric",
    "production_duration",
    "payment",



    "vendor_select",
];


export const developer = [
    {
        role: 'developer',
        content: [
            {
                type: 'text',
                text: `
                    Astra is an innovative platform designed to help users bring their clothing ideas to life. 
                    It assists users in conceptualizing unique designs and connects them with skilled tailors 
                    who can transform these ideas into real-world garments.
                    `
            },
            {
                type: 'text',
                text: `
                    As a helpful assistant, your role is to guide users through the creative process of generating 
                    their clothing ideas. You achieve this by asking thoughtful and engaging questions that help users 
                    refine their vision and make informed decisions about their designs.
                  `
            }
        ]
    }
];


export const user_info = writable({
    name: '',
    age: '',
    has_fabric_photo: false,
    design_photo_url: '',
    has_fabric: false,
    production_days: 0,
    production_cost: 0,
    state: 0
});


export const design_photo_urls = writable([]);


export const messages = writable([...developer]);


export const scroll = () => {
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
}


export const _ask = async (content, description) => {
    thinking.set(". . .")
    let resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
            'OpenAI-Organization': import.meta.env.VITE_OPENAI_ORG
        },
        body: JSON.stringify({
            model: 'gpt-4o-2024-08-06',
            messages: [
                ...get(messages),
                {
                    role: 'user',
                    content
                }
            ],
            response_format: {
                type: 'json_schema',
                json_schema: {
                    name: 'ask',
                    schema: {
                        type: 'object',
                        properties: {
                            resp: {
                                description,
                                type: 'string'
                            }
                        },
                        additionalProperties: false
                    }
                }
            }
        })
    });

    resp = await resp.json();
    thinking.set(false)

    if (resp.error) {
        console.log(resp.error.message);
    } else {
        let msg = get(messages)
        msg.push({
            role: 'assistant',
            content: JSON.parse(resp.choices[0].message.content).resp
        });
        messages.set(msg)
        scroll()
    }
};


export const _validate = async (content, properties, ppt) => {
    thinking.set(". . .")
    let resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
            'OpenAI-Organization': import.meta.env.VITE_OPENAI_ORG
        },
        body: JSON.stringify({
            model: 'gpt-4o-2024-08-06',
            messages: [
                ...get(messages),
                {
                    role: 'user',
                    content
                }
            ],
            response_format: {
                type: 'json_schema',
                json_schema: {
                    name: 'validate',
                    schema: {
                        type: 'object',
                        properties,
                        additionalProperties: false
                    }
                }
            }
        })
    });

    resp = await resp.json();
    thinking.set(false)

    if (resp.error) {
        console.log(resp.error.message);
    } else {
        let a = JSON.parse(resp.choices[0].message.content)

        if (a.status) {
            let b = get(user_info)
            b[ppt] = a.resp
            b.state++
            user_info.set(b)
        }
        else {
            let b = get(messages)
            b.push({
                role: 'assistant',
                content: a.resp
            });
            messages.set(b)
        }

        scroll()
    }
};


export let prompt_engine = (prompt, texture_info = "") => {
    const texture_note = texture_info ? `
    * the material used to make the cloth should be as stated below:
    -------------------------------
    ${texture_info}
    -------------------------------
    ` : "";

    return `
Description: ${prompt}
---------------
From the above text description, extract various clothing attributes. Examples of attributes to look out for are: fit, gender, size, category, material, pattern, occasion, color, and style.

Using these attributes, generate a beautiful illustration of the clothing item with meticulous attention to detail. The illustration should:
* Have a plain white background.
* Focus on presenting the clothing illustration clearly.
* Be styled after Rockstar Games' GTA 5 artwork, incorporating cel shading and a polished, detailed aesthetic.
* Highlight the item's fit and intricate details while ensuring it can be realistically produced using standard techniques.
* don't add any aesthetics on the white background
* the full clothing item should be in view
${texture_note}
`;
};