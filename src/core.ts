import anime from 'animejs'
import type {VueConstructor} from 'vue'
import type {DecodedInformation} from "./parser";

interface AnimeOptions {
	params: any
	el: HTMLElement,
	decodeInfo: DecodedInformation
}

interface AnimeDefineOptions {
	name: string
	enter: any
	leave: any
}

function cubicBezier(p1x, p1y, p2x, p2y, t) {
	const ay = 3 * p1y - 3 * p2y + 1;
	const by = 3 * p2y - 6 * p1y;
	const cy = 3 * p1y;

	return ((ay * t + by) * t + cy) * t
}

export class Core {
	private animePrototype = {}
	animeGroup = {}
	private easing = []
	private defaultAnimeOption = {
		duration: 360,
		autoplay: false,
	}
	install: (Vue: VueConstructor) => void;

	private assignTimeFunction (option, easing) {
		const timeFunction = this.easing.find(which => which.name === easing);
		if (timeFunction) {
			option.easing = () => timeFunction.easing;
		} else if (easing === 'easing' && !option.easing) {
			option.easing = 'easing'
		} else {
			option.easing = easing;
		}
	}

	createEnterAnimation(option: AnimeOptions): any {
		const {params, el, decodeInfo} = option;
		const {group, delay, easing, duration} = decodeInfo;
		const durationValue = duration ? duration : params.enter.duration;

		const animeOption = {
			targets: [el],
			...params.enter,
			delay,
			duration: durationValue,
			autoplay: false,
		}
		this.assignTimeFunction(animeOption, easing)

		const animation = anime(animeOption)

		if (this.animeGroup[group]) {
			this.animeGroup[group].enter.push({
				animation,
				option,
			});
			this.animeGroup[group].maxDuration = Math.max(this.animeGroup[group].maxDuration, delay)
		} else {
			this.animeGroup[group] = {
				maxDuration: durationValue,
				enter: [
					{
						animation,
						option,
					}
				],
				leave: []
			}
		}
		return animation;
	}

	createLeaveAnimation(option: AnimeOptions): any {

	}

	/**
	 * 定义出入场动画的参数，未被定义的参数会使用默认值
	 * @param options
	 */
	defineAnime(options: AnimeDefineOptions) {
		const contrast = Object.keys(this.defaultAnimeOption);
		contrast.forEach(key => {
			if (options[key] === undefined) {
				options[key] = this.defaultAnimeOption[key];
			}
		})
		this.animePrototype[options.name] = options
	}

	getAnimePrototype(name) {
		return this.animePrototype[name]
	}

	async dispatchEnter(name) {
		const resource = this.animeGroup[name];
		if (!resource) {
			return false
		}
		resource.leave.forEach(source => {
			const { animation } = source;
			animation.seek(animation.duration)
			animation.pause();
		})
		const tasks = resource.enter.map(source => {
			const { animation } = source;
			animation.restart();
			return animation.finished
		})
		await Promise.allSettled(tasks)
	}

	async dispatchLeave(group) {
		const resource = this.animeGroup[group];
		if (!resource) {
			return false
		}
		const max = resource.maxDuration || 0;
		if (!max) {
			return false
		}
		resource.leave = []
		resource.enter.forEach(source => {
			const { animation } = source;
			animation.seek(animation.duration)
			animation.pause();
		})
		const tasks = resource.enter.map(source => {
			const {option} = source;
			const {params, el, decodeInfo} = option;
			const {group, delay, easing, duration} = decodeInfo;
			const durationValue = duration ? duration : params.leave.duration;
			console.log('leave', max, delay, max - delay);
			const animeOption = {
				targets: [el],
				...params.leave,
				delay: max - delay,
				duration: durationValue,
				autoplay: false,
			}
			this.assignTimeFunction(animeOption, easing)

			const animation = anime(animeOption)

			this.animeGroup[group].leave.push({
				animation,
				option,
			});

			animation.play();
			return animation.finished
		})
		await Promise.allSettled(tasks)
		this.animeGroup[group] = undefined;
	}

	defineCubicBezier(name, x1, y1, x2, y2) {
		this.easing.push({
			name,
			easing: t => cubicBezier(x1, y1, x2, y2, t)
		})
	}
}
