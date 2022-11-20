export const prerender = false;

import {SECTRET_API_KEY} from '$env/static/private';
import type {Actions, PageServerLoad} from './$types';

let result: any;

export const load : PageServerLoad = async ()=>{
  return result;
};

export const actions: Actions = {
  default: async ({request}:{request:Request}) =>{
    const data = await request.formData();
    const img = data.get('orgimg');

    const bodyinit = {
      'image': {
        'content': String(img),
      },
    };

    const res = await fetch('https://api.pretrained.ai/ikram/face-detection', {
      method: 'POST',
      body: JSON.stringify(bodyinit),
      headers: {
        'Authorization': 'Bearer 4db9b82aaa0da4e8d1e6b91018cef42a',
        'Content-Type': 'application/json',
      },
    });
    result = await res.json();
  },
};
