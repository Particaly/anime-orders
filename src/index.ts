import anime from 'animejs'
import { Core } from './core'
import { Parser } from './parser'
import defaultDefine from './define'
import type { VueConstructor } from 'vue'
import type { DecodedInformation } from './parser'

const instance = new Core()

defaultDefine(instance)

instance.defineCubicBezier('easing', 0.25, 0.1, 0.25, 1)

instance.install = function (Vue:VueConstructor) {
	Vue.prototype.$anime = instance;
	Vue.directive('ani', {
		inserted(el, binding) {
			console.log(binding);
			const { value, arg } = binding;
			const materials = arg + ' ' + (value || '')
			const decodeInfo = Parser.decode(materials) as DecodedInformation
			console.log(decodeInfo);
			const options = instance.getAnimePrototype(decodeInfo.name);
			console.log(options);
			if (!options) {
				return false
			}
			const enter = instance.createEnterAnimation({
				el,
				decodeInfo,
				params: options
			})
			instance.createLeaveAnimation({
				el,
				decodeInfo,
				params: options
			})
			enter.play();
		},
		componentUpdated(el, binding, node, old) {
			console.log(el, binding, node, old);
		}
	})
}

export default instance
