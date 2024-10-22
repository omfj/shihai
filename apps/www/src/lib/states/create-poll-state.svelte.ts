export class CreatePollState {
	#question = $state('');
	#options = $state(['']);

	get question() {
		return this.#question;
	}

	set question(value: string) {
		this.#question = value;
	}

	get options() {
		return this.#options;
	}

	set options(value: Array<string>) {
		this.#options = value;
	}

	deleteOption(index: number) {
		this.#options = this.#options.filter((_, i) => i !== index);
	}

	addOption() {
		this.#options = [...this.#options, ''];
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
