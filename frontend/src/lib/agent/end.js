import { get } from 'svelte/store';
import { messages, user_info, thinking, scroll } from './index.js';


export const ask = async () => {
	let msg = get(messages)
	let info = get(user_info)


	msg.push({
		role: 'assistant',
		content: "**** SESSION END ****"
	});
	msg.push({
		role: 'assistant',
		content: `
			Thank you for exploring this AI Agent demo! Below is the information gathered from your responses:
			<br/><br/>
			**** USER INFORMATION ****
			<br/>
			Name ==> ${info.name} <br/>
			Age ==> ${info.age} <br/>
			Has Fabric Photo ==> ${info.has_fabric_photo} <br/>
			Design Photo URL ==> <a href="${info.design_photo_url}" target="_blank">Generated Photo</a> <br/>
			Has Physical Fabric ==> ${info.has_fabric} <br/>
			Production Days ==> ${info.production_days} <br/>
			Production Cost ==> $${info.production_cost} <br/><br/>

			You can test this AI Agent again by refreshing this page.
		`
	});
	messages.set(msg)
	thinking.set("**** SESSION END ****")
	scroll()
};
