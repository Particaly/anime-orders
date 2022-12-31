export interface DecodedInformation {
	name: string
	delay: number
	group: string
	easing: string
	duration: number
}
export class Parser {
	// name group delay? easing? duration?
	static decode(str: string): DecodedInformation {
		const list = str.split(' ');
		const name = list[0];
		const result = {
			name,
			group: list[1],
			delay: 0,
			easing: 'easing',
			duration: 0
		}
		if (list.length === 2) {
			return result;
		}

		if (list.length === 3) {
			result.delay = Number(list[2]);
			return result;
		}

		const isEasing = Number.isNaN(Number(list[2]));
		if (isEasing) {
			result.easing = list[2];
			result.duration = list[3] ? Number(list[3]) : 0;
			return result
		}
		result.delay = Number(list[2]);
		if (Number.isNaN(Number(list[3]))) {
			result.easing = list[3];
		}
		if (list.length === 4) {
			result.duration = list[3] ? Number(list[3]) : 0;
		} else if (list.length === 5) {
			result.duration = list[4] ? Number(list[4]) : 0;
		}
		return result;
	}
}
