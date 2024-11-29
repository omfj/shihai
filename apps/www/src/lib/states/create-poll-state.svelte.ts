import { nanoid } from 'nanoid';

type Option = {
	id: string;
	value: string;
};

type CreatePollStateOptions = Partial<{
	question: string;
	expiresAt: string | null;
	options: Array<Option>;
}>;

export class CreatePollState {
	#question = $state('');
	#expiresAt = $state<string | null>(null);
	#options = $state<Array<Option>>([{ id: nanoid(), value: '' }]);

	constructor(opts: CreatePollStateOptions = {}) {
		if (opts?.question) {
			this.#question = opts.question;
		}

		if (opts?.expiresAt) {
			this.#expiresAt = opts.expiresAt;
		}

		if (opts?.options) {
			this.#options = opts.options;
		}

		$effect(() => {
			const lastOption = this.#options[this.#options.length - 1];

			if (lastOption.value !== '') {
				this.addOption();
			}
		});
	}

	get question() {
		return this.#question;
	}

	set question(value: string) {
		this.#question = value;
	}

	get expiresAt() {
		return this.#expiresAt;
	}

	set expiresAt(value: string | null) {
		this.#expiresAt = value;
	}

	get options() {
		return this.#options;
	}

	set options(value: Array<Option>) {
		this.#options = value;
	}

	deleteOption(index: number) {
		this.#options = this.#options.filter((_, i) => i !== index);
	}

	addOption() {
		this.#options = [...this.#options, { id: nanoid(), value: '' }];
	}

	moveOption(index: number, direction: 'up' | 'down') {
		if (direction === 'up' && index === 0) {
			return;
		}

		if (direction === 'down' && index === this.#options.length - 1) {
			return;
		}

		const newIndex = direction === 'up' ? index - 1 : index + 1;
		const temp = this.#options[index];
		this.#options[index] = this.#options[newIndex];
		this.#options[newIndex] = temp;
	}
}
