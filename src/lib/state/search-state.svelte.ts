import type { TSearchState } from '$lib/types';

const searchState = $state<TSearchState>({
	search: '',
});

export default searchState;
