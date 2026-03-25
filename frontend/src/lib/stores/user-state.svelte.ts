import type { DimensionScore, UserState } from '$lib/types/index.js';

const STORAGE_KEY = 'pm-os-user-state';

const DEFAULT_STATE: UserState = {
	currentDay: 1,
	scores: [],
	dayStatuses: {}
};

function loadFromStorage(): UserState {
	if (typeof window === 'undefined') {
		return { ...DEFAULT_STATE };
	}
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (raw === null) {
			return { ...DEFAULT_STATE };
		}
		return JSON.parse(raw) as UserState;
	} catch {
		return { ...DEFAULT_STATE };
	}
}

function persist(state: UserState): void {
	if (typeof window === 'undefined') return;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Internal reactive state — initialized lazily on first module import.
// SvelteKit adapter-static disables SSR, so window is available at runtime.
let _state = $state<UserState>(loadFromStorage());

export const userState: UserState = _state;

export function addScores(newScores: DimensionScore[]): void {
	_state.scores = [..._state.scores, ...newScores];
	persist(_state);
}

export function resetState(): void {
	_state.currentDay = DEFAULT_STATE.currentDay;
	_state.scores = [...DEFAULT_STATE.scores];
	_state.dayStatuses = { ...DEFAULT_STATE.dayStatuses };
	persist(_state);
}
