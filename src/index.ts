import { Core } from './core'
import { Parser } from './parser'
import defaultDefine from './define'
import type { VueConstructor } from 'vue'
import type { DecodedInformation } from './parser'

const instance = new Core()

defaultDefine(instance)

instance.defineCubicBezier('easing', 0.25, 0.1, 0.25, 1)

instance.directive = {
	inserted(el, binding) {
		const { value, arg } = binding;
		const materials = arg + ' ' + (value || '')
		const decodeInfo = Parser.decode(materials) as DecodedInformation

		const autoplay = el.getAttribute('auto') || '';
		const options = instance.getAnimePrototype(decodeInfo.name);

		if (!options) {
			return false
		}
		const enter = instance.createEnterAnimation({
			el,
			decodeInfo,
			params: options
		})
		if (autoplay.toString() !== 'false') {
			enter.play();
		}
	},
}
instance.install = function (Vue:VueConstructor) {
	Vue.directive('ani', instance.directive)
}

export default instance
