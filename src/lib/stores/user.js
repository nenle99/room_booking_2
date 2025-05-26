import { writable } from 'svelte/store';

let initialUser = { name: '', role: '' };

if (typeof localStorage !== 'undefined') {
	const storedUser = localStorage.getItem('user');
	if (storedUser) {
		try {
			initialUser = JSON.parse(storedUser);
		} catch (e) {
			console.warn('Ungültiger Benutzer im localStorage');
		}
	}
}

export const user = writable(initialUser);